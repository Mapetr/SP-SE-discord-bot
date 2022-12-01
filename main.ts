import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import * as Discord from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';
import * as oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { verifyKey } from "npm:discord-interactions@^3.2.0";

const router = new oak.Router();

router.post("/", async (ctx) => {
  const message = await ctx.request.body({ type: "json" }).value;
  if (message.type === Discord.InteractionType.Ping) {
    ctx.response.body = {
      type: Discord.InteractionResponseType.Pong,
    };
    return;
  }
});

const app = new oak.Application();
app.use(async (ctx, next) => {
  if (ctx.request.method === "POST") {
    const signature = ctx.request.headers.get("X-Signature-Ed25519");
    const timestamp = ctx.request.headers.get("X-Signature-Timestamp");
    const body = await ctx.request.body({ type: "text" }).value;
    const publicKey = Deno.env.get("PUBLIC_KEY") ?? "";
    const isValid = verifyKey(
      body,
      signature,
      timestamp,
      publicKey,
    );
    console.log(`isValid: ${isValid}`);
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
