-- AlterTable
ALTER TABLE `Message` ADD COLUMN `conversationId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `conversationId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` VARCHAR(191) NOT NULL,
    `Friends` BOOLEAN NULL DEFAULT false,
    `AcceptedRequest` BOOLEAN NULL DEFAULT false,
    `senderId` VARCHAR(191) NOT NULL,
    `recevierId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_recevierId_fkey` FOREIGN KEY (`recevierId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
