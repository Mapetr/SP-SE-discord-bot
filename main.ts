import { oak } from "./deps.ts";
import {Context} from "https://deno.land/x/oak@v11.1.0/context.ts";

const app = new oak.Application();
const router = new oak.Router();

app.use((ctx: Context, next) => {
  if (ctx.request.method === "POST") {
    // Check for signatures
  }
});

console.log("Listening on port 8000");
await app.listen({ port: 8000 });
