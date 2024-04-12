/*
  Warnings:

  - You are about to alter the column `type` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropIndex
DROP INDEX `Category_type_key` ON `Category`;

-- AlterTable
ALTER TABLE `Category` MODIFY `type` ENUM('BUSINESS', 'SPORTS', 'EDUCATION') NOT NULL DEFAULT 'BUSINESS';
