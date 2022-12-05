import "https://deno.land/std@0.167.0/dotenv/load.ts";
import {
  APIInteraction,
  InteractionType,
  InteractionResponseType,
} from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';
import * as oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { commands, Command } from "./commands/mod.ts";
import { SendReply, verifyKey, Send } from "./util/mod.ts";
import {Client, Databases} from "https://deno.land/x/appwrite/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new oak.Router();

const client = new Client()
  .setEndpoint(Deno.env.get("APPWRITE_ENDPOINT") || "")
  .setProject(Deno.env.get("APPWRITE_PROJECT_ID") || "")
  .setKey(Deno.env.get("APPWRITE_API_KEY") || "");

const database = new Databases(client);
const databaseId = Deno.env.get("APPWRITE_DATABASE_ID") || "";

router.post("/", async (ctx) => {
  const message = await ctx.request.body({ type: "json" }).value;
  switch (message.type) {
    case InteractionType.Ping:
    {
      ctx.response.body = {
        type: InteractionResponseType.Pong,
      };
      return;
    }
    case InteractionType.ApplicationCommand:
    {
      const interaction = message as APIInteraction;
      const name = message.data.name;
      const command = commands.find((command: Command) => command.name === name);
      if (command) {
        const response = await command.execute(interaction).catch(console.error);
        if (response) {
          ctx.response.body = response;
        } else {
          ctx.response.body = SendReply("An error occurred.", true);
        }
      } else {
        console.log(`Command ${name} not found.`);
        ctx.response.body = SendReply(`Command ${name} not found.`, true);
      }
      return;
    }
  }
});

router.get("/auth/:code", async (ctx) => {
  const code = ctx.params.code;
  const collectionId = Deno.env.get("APPWRITE_AUTH_ID") || "";
  const data = await database.getDocument(databaseId, collectionId, code);
  if (!data) {
    return ctx.response.body = "Invalid code.";
  }
  if (data.expires < Date.now()) {
    database.deleteDocument(databaseId, collectionId, code);
    ctx.response.body = "Code expired.";
    return;
  }
  await oak.send(ctx, "./static/code.html");
});

router.put("/auth/resp/:code", async (ctx) => {
  const code = ctx.params.code;
  const message = await ctx.request.body({ type: "json" }).value;
  const collectionId = Deno.env.get("APPWRITE_AUTH_ID") || "";
  const data = await database.getDocument(databaseId, collectionId, code).catch((err) => {
    console.error(err);
  });
  console.log(data);
  if (!data) {
    return ctx.response.body = "Invalid code.";
  }
  if (data.expires < Date.now()) {
    database.deleteDocument(databaseId, collectionId, code);
    ctx.response.body = "Code expired.";
    return;
  }
  const userId = data.userId;
  const guildId = data.guildId;
  const role = await axiod(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${Deno.env.get("TOKEN")}`,
      "User-Agent": "DiscordBot (https://github.com/Mapetr/SPSSE-discord-bot, 0.3.0)"
    }
  }).catch((err) => {
    console.error(err);
  });
  let specRole = role.data.find((role: any) => role.name === message.department);
  specRole = specRole.id;
  if (!specRole) {
    await axiod(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${Deno.env.get("TOKEN")}`,
        "User-Agent": "DiscordBot (https://github.com/Mapetr/SPSSE-discord-bot, 0.3.0)"
      },
      data: {
        name: message.department,
        mentionable: true,
      }
    }).then((res) => {
      specRole = res.data.id;
    }).catch((err) => {
      console.error(err);
    });
  }
  let name = message.name.split(" ");
  name.pop();
  name = name.join(" ");
  await axiod(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Deno.env.get("TOKEN")}`,
      "User-Agent": "DiscordBot (https://github.com/Mapetr/SPSSE-discord-bot, 0.3.0)"
    },
    data: {
      nick: name,
    },
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.error(err);
  });
  await axiod(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${specRole}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${Deno.env.get("TOKEN")}`,
      "User-Agent": "DiscordBot (https://github.com/Mapetr/SPSSE-discord-bot, 0.3.0)",
    }
  }).catch((err) => {
    console.error(err);
  });
});

router.get("/", async (ctx) => {
  const token = Deno.env.get("TOKEN");
  const applicationId = Deno.env.get('APPLICATION_ID');
  if (!token || !applicationId) {
    throw new Error('Missing token or applicationId');
  }
  let commandsFinal: Partial<Command> = commands;
  commandsFinal.forEach((command) => {
    delete command.execute;
  });
  console.log(JSON.stringify(commandsFinal));
  axiod({
    method: "PUT",
    url: `https://discord.com/api/v10/applications/${applicationId}/commands`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${token}`,
      'User-Agent': 'DiscordBot (https://github.com/Mapetr/SPSSE-discord-bot, 0.3.0)',
    },
    data: JSON.stringify(commandsFinal),
  })
  return;
});

const app = new oak.Application();

app.use(
  oakCors({
    origin: "*"
  }),
);

app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    context.response.status = 500;
    context.response.body = { error: "to dělal asi někdo úplně neschopnej, asi nějaká paní" };
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.method === "POST") {
    const signature = ctx.request.headers.get("X-Signature-Ed25519") ?? "";
    const timestamp = ctx.request.headers.get("X-Signature-Timestamp") ?? "";
    const body = await ctx.request.body({ type: "text" }).value;
    const publicKey = Deno.env.get("PUBLIC_KEY") ?? "";
    const isValid = await verifyKey(
      body,
      signature,
      timestamp,
      publicKey,
    );
    if (!isValid) {
      console.log("Invalid request signature");
      ctx.response.status = 401;
      return;
    }
  }
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening on port 8000");
await app.listen({ port: 8000 });
