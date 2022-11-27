import * as sdk from "https://deno.land/x/appwrite@6.1.0/mod.ts";

export const appwrite = new sdk.Client()
  .setEndpoint(Deno.env.get("APPWRITE_ENDPOINT") ?? "")
  .setProject(Deno.env.get("APPWRITE_PROJECT_ID") ?? "")
  .setKey(Deno.env.get("APPWRITE_API_KEY") ?? "");

export const database = new sdk.Databases(appwrite);

export const ID = sdk.ID;
