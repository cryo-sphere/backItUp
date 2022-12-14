import { IgloClient, LogLevel } from "@snowcrystals/iglo";
import { GatewayIntentBits } from "discord.js";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import errorHandler from "./handlers/ErrorHandler.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const basePath = join(__dirname, "..", "bot");

export default class BackItUpClient extends IgloClient {
	public constructor() {
		super({
			errorHandler,
			logger: { level: process.env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info },
			paths: { commands: join(basePath, "commands"), events: join(basePath, "events"), interactions: join(basePath, "interactions") },
			client: { intents: [GatewayIntentBits.Guilds] }
		});
	}
}
