/*
  Warnings:

  - Added the required column `backup_secret` to the `guild_backup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guild_backup" ADD COLUMN     "backup_secret" TEXT NOT NULL;
