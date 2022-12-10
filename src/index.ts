import { config } from "dotenv";
import { join } from "node:path";
config({ path: join(process.cwd(), "data", ".env") });

import BackItUpClient from "./lib/Client.js";
const client = new BackItUpClient();
void client.run(process.env.DISCORD_TOKEN ?? "");
