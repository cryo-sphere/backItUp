import type { Guild } from "discord.js";
import type BackItUpClient from "../Client.js";

export default class BackUp {
	public guild!: Guild;
	public constructor(public client: BackItUpClient, public data: BackUpData) {}

	public load(): boolean {
		const guild = this.data.guild.id
			? this.client.guilds.cache.get(this.data.guild.id)
			: this.client.guilds.cache.find((g) => g.name === this.data.guild.name);
		if (!guild) return false;

		this.guild = guild;
		return true;
	}

	public static parse(client: BackItUpClient, data: any) {
		return new BackUp(client, data);
	}
}

interface BackUpData {
	guild: BackUpGuild;
	widget: BackUpWidget;

	// automod stuff
	// community stuff

	roles: BackUpRole[];
	bans: BackUpBan[];

	emojis: BackUpEmoji[];
	stickers: BackUpSticker[];
}

interface BackUpGuild {
	name: string;
	guildId?: string;
	id: string; // secret identifier for retrieving data from from other server (only )
	icon: ImageHash;
	inactive: {
		channel?: string;
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
	inviteBackground?: ImageHash; // todo image type
	banner?: ImageHash;
}

interface BackUpWidget {
	enabled: boolean;
	channel: string;
}

interface BackUpRole {
	name: string;
	id?: string;
	postion: number;

	icon?: ImageHash;
	color: string;

	mention: boolean;
	display: boolean;

	permissions: bigint;
	members: string[];
}

interface BackUpBan {
	member: string;
	reason: string;
}

interface BackUpEmoji {
	name: string;
	image: ImageHash;
}

interface BackUpSticker {
	name: string;
	emoji: string;
	description?: string;
	image: ImageHash;
}

type ImageHash = string;
