import type { Guild } from "discord.js";
import type BackItUpClient from "../Client.js";
import type { BackUpBan, BackUpData, BackUpEmoji, RawBackUp, BackUpSticker, BackUpRole } from "./type.js";

export default class BackUp {
	public guild!: Guild;
	public id: string;

	public constructor(public client: BackItUpClient, public data: BackUpData) {
		this.id = data.guild.id;
	}

	public loadGuild(): boolean {
		const guild = this.data.guild.id
			? this.client.guilds.cache.get(this.data.guild.id)
			: this.client.guilds.cache.find((g) => g.name === this.data.guild.name);
		if (!guild) return false;

		this.guild = guild;
		return true;
	}

	public static parse(client: BackItUpClient, data: RawBackUp) {
		const bans = data.bans.map<BackUpBan>((ban) => ({ member: ban.userId, reason: ban.reason }));
		const emojis = data.emojis.map<BackUpEmoji>((emoji) => ({ name: emoji.name, image: emoji.emoji }));
		const stickers = data.stickers.map<BackUpSticker>((sticker) => ({
			name: sticker.name,
			emoji: sticker.emoji,
			description: sticker.description,
			image: sticker.sticker
		}));
		const roles = data.roles.map<BackUpRole>((role) => ({
			name: role.name,
			id: role.id ?? undefined,
			postion: role.position,
			permissions: role.permissions,
			color: role.color,
			display: role.displaySeparate,
			members: role.members,
			mention: role.mentionEveryone,
			icon: role.icon ?? undefined
		}));

		const backUp: BackUpData = {
			guild: {
				id: data.backUpId,
				name: data.guildName,
				nitroProgress: data.nitroProgressEnabled,
				banner: data.guildBanner ?? undefined,
				icon: data.guildIcon ?? undefined,
				guildId: data.guildId ?? undefined,
				inviteBackground: data.inviteBackground ?? undefined,
				inactive: {
					channelId: data.inactiveChannelId ?? undefined,
					channelName: data.inactiveChannelName ?? undefined,
					timeout: data.inactiveTimeout
				},
				system: {
					channelId: data.systemChannelId ?? undefined,
					channelName: data.systemChannelName ?? undefined,
					join: data.systemEnableJoin,
					boost: data.systemEnableBoost,
					tips: data.systemEnableTips,
					stickerButton: data.systemEnableSticker
				}
			},
			widget: {
				enabled: data.widgetEnabled,
				channelId: data.widgetChannelId ?? undefined,
				channelName: data.widgetChannelName ?? undefined
			},
			bans,
			emojis,
			roles,
			stickers
		};

		return new BackUp(client, backUp);
	}
}
