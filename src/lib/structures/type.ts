import type {
	BackUp as RawBackUpType,
	BackUpBan as RawBackUpBan,
	BackUpEmoji as RawBackUpEmoji,
	BackUpRole as RawBackUpRole,
	BackUpSticker as RawBackUpSticker
} from "@prisma/client";

interface RawBackUpComplete {
	bans: RawBackUpBan[];
	emojis: RawBackUpEmoji[];
	roles: RawBackUpRole[];
	stickers: RawBackUpSticker[];
}

export type RawBackUp = RawBackUpType & RawBackUpComplete;

export interface BackUpData {
	guild: BackUpGuild;
	widget: BackUpWidget;

	// automod stuff
	// community stuff

	roles: BackUpRole[];
	bans: BackUpBan[];

	emojis: BackUpEmoji[];
	stickers: BackUpSticker[];
}

export interface BackUpGuild {
	name: string;
	guildId?: string;
	id: string; // secret identifier for retrieving data from from other server (only )
	icon?: ImageHash;
	inactive: {
		channelId?: string;
		channelName?: string;
		timeout: number;
	};
	system: {
		channelId?: string;
		channelName?: string;
		join: boolean;
		stickerButton: boolean;
		boost: boolean;
		tips: boolean;
	};
	nitroProgress: boolean;
	inviteBackground?: ImageHash; // todo image type
	banner?: ImageHash;
}

export interface BackUpWidget {
	enabled: boolean;
	channelId?: string;
	channelName?: string;
}

export interface BackUpRole {
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

export interface BackUpBan {
	member: string;
	reason: string;
}

export interface BackUpEmoji {
	name: string;
	image: ImageHash;
}

export interface BackUpSticker {
	name: string;
	emoji: string;
	description?: string;
	image: ImageHash;
}

export type ImageHash = string;

export interface BackItUpSettings {
	backUpTime: number; // min 4 hours, max 1 week (premium: starting at every hour)
	backUpHistory: number; // default = 2 days, premium: 7 days, 31 days
	backUpAmount: number; // max 16 for default, premium = unlimited
	manualTriggerAmount: number; // default 2, premium 4 (all per day)
	backUpIds: string[];
}
