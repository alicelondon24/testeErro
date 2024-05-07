-- CreateTable
CREATE TABLE `usuario` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_nome` VARCHAR(300) NULL,
    `usuario_email` VARCHAR(100) NULL,
    `usuario_cpf` VARCHAR(11) NULL,
    `usuario_cnpj` VARCHAR(14) NOT NULL,
    `usuario_endereco` VARCHAR(100) NULL,
    `usuario_status` INTEGER NULL,
    `usuario_cargo` VARCHAR(45) NULL,
    `usuario_tipo` INTEGER NOT NULL DEFAULT 1,
    `empresa_id` INTEGER NULL,

    INDEX `fk_usuario_empresa1_idx`(`empresa_id`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresa` (
    `empresa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_nome` VARCHAR(300) NULL,
    `empresa_cnpj` VARCHAR(14) NULL,

    PRIMARY KEY (`empresa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`empresa_id`) ON DELETE SET NULL ON UPDATE CASCADE;
