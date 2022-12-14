import type { Guild } from "discord.js";
import type BackItUpClient from "../Client.js";

export default class BackUp {
	public guild!: Guild;
	public constructor(public client: BackItUpClient, public data: BackUpData) {
		this.guild;
	}

	public load(): boolean {
		const guild = this.data.guild.id
			? this.client.guilds.cache.get(this.data.guild.id)
			: this.client.guilds.cache.find((g) => g.name === this.data.guild.name);
		if (!guild) return false;

		this.guild = guild;
		return true;
	}
}

interface BackUpData {
	guild: BackUpGuild;
	widget: BackUpWidget;

	roles: BackUpRole[];
	bans: BackUpBan[];

	// automod stuff
	// community stuff

	emojis: BackUpEmoji[];
	stickers: BackUpSticker[];
}

interface BackUpGuild {
	name: string;
	id?: string;
	icon: unknown; // todo: image type
	inactive: {
		channel: string;
		timeout: number;
	};
	system: {
		channel: string | null;
		join: boolean;
		stickerButton: boolean;
		boost: boolean;
		tips: boolean;
	};
	nitroProgress: boolean;
	inviteBackground?: unknown; // todo image type
	banner?: unknown; // todo: image type
}

interface BackUpWidget {
	enabled: boolean;
	channel: string;
}

interface BackUpRole {
	name: string;
	postion: number;

	icon?: unknown; // todo: image type
	color: string;

	mention: boolean;
	display: boolean;

	permissions: string;
	members: string[];
}

interface BackUpBan {
	member: string;
	reason: string;
}

interface BackUpEmoji {
	name: string;
	image: unknown; // todo: image type
}

interface BackUpSticker {
	name: string;
	emoji: string;
	description?: string;
	image: unknown; // todo: image type
}
