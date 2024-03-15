/*
  Warnings:

  - You are about to drop the column `AcceptedRequest` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `Friends` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `recevierId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `recevierId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `conversationId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_recevierId_fkey`;

-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_recevierId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` DROP COLUMN `AcceptedRequest`,
    DROP COLUMN `Friends`,
    DROP COLUMN `recevierId`,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `recevierId`,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `conversationId`;

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_senderId_receiverId_key` ON `Conversation`(`senderId`, `receiverId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
