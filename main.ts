import "https://deno.land/std@0.167.0/dotenv/load.ts";
import { APIInteraction, InteractionType, InteractionResponseType } from 'https://deno.land/x/discord_api_types@0.37.19/v10.ts';
import * as oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { commands, Command } from "./commands/mod.ts";
import { SendReply, verifyKey } from "./util/mod.ts";

const router = new oak.Router();

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

router.get("/", async (ctx) => {
  const token = Deno.env.get("TOKEN");
  const applicationId = Deno.env.get('APPLICATION_ID');
  if (!token || !applicationId) {
    throw new Error('Missing token or applicationId');
  }
  await fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${token}`,
    },
    body: JSON.stringify(commands),
  }).then((res) => {
    console.log(res.body);
    ctx.response.body = 'Registered all commands';
  }).catch((err) => {
    console.log(`Error: ${err}`);
    ctx.response.body = 'Error registering commands';
  });
});

const app = new oak.Application();

app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (oak.isHttpError(err)) {
      context.response.status = err.status;
    } else {
      context.response.status = 500;
    }
    context.response.body = { error: err.message };
    context.response.type = "json";
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
