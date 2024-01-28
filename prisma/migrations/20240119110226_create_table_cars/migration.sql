-- CreateTable
CREATE TABLE `cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `merek` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NULL,
    `tahun_produksi` VARCHAR(200) NULL,
    `warna` VARCHAR(20) NULL,
    `bahan_bakar` VARCHAR(100) NULL,
    `kilometer_tempuh` VARCHAR(100) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
