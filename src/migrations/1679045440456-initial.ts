import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1679045440456 implements MigrationInterface {
    name = 'initial1679045440456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_c945d94386c7ae03ddeba31d071\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`campaigns\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`goal\` int NOT NULL DEFAULT '0', \`status\` enum ('active', 'fraud', 'successful') NOT NULL DEFAULT 'active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c945d94386c7ae03ddeba31d071\` FOREIGN KEY (\`campaignId\`) REFERENCES \`campaigns\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c945d94386c7ae03ddeba31d071\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`total\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`campaigns\``);
        await queryRunner.query(`CREATE INDEX \`FK_c945d94386c7ae03ddeba31d071\` ON \`users\` (\`campaignId\`)`);
    }

}
