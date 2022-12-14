-- CreateTable
CREATE TABLE "guild_backup" (
    "backup_id" TEXT NOT NULL,
    "backup_creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guild_name" TEXT NOT NULL,
    "guild_id" TEXT,
    "guild_icon" TEXT,
    "inactive_channel_id" TEXT,
    "inactive_channel_name" TEXT,
    "inactive_timeout" INTEGER NOT NULL,
    "system_channel_name" TEXT,
    "system_channel_id" TEXT,
    "system_enable_join" BOOLEAN NOT NULL,
    "system_enable_sticker" BOOLEAN NOT NULL,
    "system_enable_boost" BOOLEAN NOT NULL,
    "system_enable_tips" BOOLEAN NOT NULL,
    "nitro_progress_enabled" BOOLEAN NOT NULL,
    "invite_banner" TEXT,
    "guild_banner" TEXT,
    "widget_enabled" BOOLEAN NOT NULL,
    "widget_channel_name" TEXT,
    "widget_channel_id" TEXT,

    CONSTRAINT "guild_backup_pkey" PRIMARY KEY ("backup_id")
);

-- CreateTable
CREATE TABLE "BackUpRole" (
    "backup_id" TEXT NOT NULL,
    "role_id" TEXT,
    "role_name" TEXT NOT NULL,
    "role_position" INTEGER NOT NULL,
    "role_icon" TEXT NOT NULL,
    "role_color" TEXT NOT NULL,
    "role_mention_everyone" BOOLEAN NOT NULL,
    "role_display_separate" BOOLEAN NOT NULL,
    "role_permissions" BIGINT NOT NULL,
    "role_members" TEXT[],
    "backUpBackUpId" TEXT,

    CONSTRAINT "BackUpRole_pkey" PRIMARY KEY ("backup_id")
);

-- CreateTable
CREATE TABLE "BackUpBan" (
    "backup_id" TEXT NOT NULL,
    "ban_user_id" TEXT NOT NULL,
    "ban_reason" TEXT NOT NULL,
    "backUpBackUpId" TEXT,

    CONSTRAINT "BackUpBan_pkey" PRIMARY KEY ("backup_id")
);

-- CreateTable
CREATE TABLE "BackUpEmoji" (
    "backup_id" TEXT NOT NULL,
    "emoji_id" TEXT NOT NULL,
    "emoji_hash" TEXT NOT NULL,
    "backUpBackUpId" TEXT,

    CONSTRAINT "BackUpEmoji_pkey" PRIMARY KEY ("backup_id")
);

-- CreateTable
CREATE TABLE "BackUpSticker" (
    "backup_id" TEXT NOT NULL,
    "sticker_id" TEXT,
    "sticker_name" TEXT NOT NULL,
    "sticker_related_emoji" TEXT NOT NULL,
    "sticker_description" TEXT NOT NULL,
    "sticker_hash" TEXT NOT NULL,
    "backUpBackUpId" TEXT,

    CONSTRAINT "BackUpSticker_pkey" PRIMARY KEY ("backup_id")
);

-- AddForeignKey
ALTER TABLE "BackUpRole" ADD CONSTRAINT "BackUpRole_backUpBackUpId_fkey" FOREIGN KEY ("backUpBackUpId") REFERENCES "guild_backup"("backup_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackUpBan" ADD CONSTRAINT "BackUpBan_backUpBackUpId_fkey" FOREIGN KEY ("backUpBackUpId") REFERENCES "guild_backup"("backup_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackUpEmoji" ADD CONSTRAINT "BackUpEmoji_backUpBackUpId_fkey" FOREIGN KEY ("backUpBackUpId") REFERENCES "guild_backup"("backup_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackUpSticker" ADD CONSTRAINT "BackUpSticker_backUpBackUpId_fkey" FOREIGN KEY ("backUpBackUpId") REFERENCES "guild_backup"("backup_id") ON DELETE SET NULL ON UPDATE CASCADE;
