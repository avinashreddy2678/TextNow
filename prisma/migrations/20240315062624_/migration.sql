-- DropIndex
DROP INDEX `Message_senderId_receiverId_key` ON `Message`;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `conversationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
