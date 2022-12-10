import { ErrorHandler, InteractionHandlerError } from "@snowcrystals/iglo";
import { Interaction, CacheType, DiscordAPIError } from "discord.js";
import { bold, underline } from "colorette";

export default class extends ErrorHandler {
	public override async handleError(error: Error, interaction?: Interaction<CacheType> | undefined): Promise<void> {
		if (error instanceof InteractionHandlerError) {
			let fatal = false;
			if (["InvalidDirectory", "noConstructorOptions"].includes(error.type)) fatal = true;

			const message = `${bold(underline(`InteractionHandlerError(${error.type})`))}: ${error.message}`;
			this.client.logger[fatal ? "fatal" : "error"](message);
		} else if (error instanceof DiscordAPIError && interaction && !this.isSilencedError(interaction.channelId ?? "", interaction.guildId, error))
			this.client.logger.error(`${bold(underline(`DiscordAPIError(${error.name})`))}: ${error.message}`);
		else this.client.logger.error(`${bold(underline(`Error(${error.name})`))}: ${error.message}`);

		if (interaction && interaction.isRepliable())
			await interaction
				.followUp({
					content:
						"Welcome to our corner of errors, a place you shouldn't come to too often. It is probably not your fault though, something on our side brought you here. Stay safe out there, if this happens again make sure to contact the support team."
				})
				.catch(() => void 0);
	}
}
