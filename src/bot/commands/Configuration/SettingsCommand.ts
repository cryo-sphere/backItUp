import { ApplyOptions, SubCommand, SubCommandOptions } from "@snowcrystals/iglo";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";

@ApplyOptions<SubCommandOptions>({
	name: "settings",
	description: "Settings Command.",
	permissions: {
		dm: false
	},
	options: [
		{
			name: "update",
			type: ApplicationCommandOptionType.Subcommand,
			description: "Update the settings directly from a modal."
		},
		{
			name: "show",
			type: ApplicationCommandOptionType.Subcommand,
			description: "View the settings."
		}
	],
	subcommands: [
		{
			name: "update",
			functionName: "update"
		},
		{
			name: "show",
			functionName: "show"
		}
	]
})
export default class extends SubCommand {
	public async update(interaction: CommandInteraction) {
		await interaction.reply("Maybe later.");
	}

	public async show(interaction: CommandInteraction) {
		await interaction.reply("Coming soon....");
	}
}
