/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_conversationId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `Accepted` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `Friends` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `conversationId`;

-- CreateIndex
CREATE UNIQUE INDEX `Message_senderId_receiverId_key` ON `Message`(`senderId`, `receiverId`);
