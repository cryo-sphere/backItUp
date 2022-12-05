import { ApplyOptions, Command, CommandOptions } from "@snowcrystals/iglo";
import type { CommandInteraction } from "discord.js";
import ms from "ms";

@ApplyOptions<CommandOptions>({
	name: "ping",
	description: "Ping! Pong!"
})
export default class extends Command {
	public override async run(interaction: CommandInteraction) {
		const msg = await interaction.reply({ content: `Pinging...`, fetchReply: true });
		const roundtrip = ms(Date.now() - msg.createdAt.getTime());
		const ping = ms(this.client.ws.ping);

		await interaction.editReply(`Pong! Roundtrip took: \`${roundtrip}\`, overall ping: ${ping}`);
	}
}
