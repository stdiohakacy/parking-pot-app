import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1689660886456 implements MigrationInterface {
    name = 'Initial1689660886456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "licenseNo" character varying NOT NULL, "type" character varying NOT NULL, "parkingSpotId" uuid NOT NULL, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parking_spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "isFree" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parking_rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "hours" integer NOT NULL, "rate" integer NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_df296c6495dc8bffd59daa06d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "type" character varying NOT NULL DEFAULT 'admin', "profile" jsonb NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entrances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_42084a4198f5ed4c46257702e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "status" character varying NOT NULL DEFAULT 'pending', "amount" integer NOT NULL DEFAULT '0', "type" character varying NOT NULL DEFAULT 'cash', CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parking_tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "ticketNo" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "exit" TIMESTAMP WITH TIME ZONE, "amount" integer NOT NULL DEFAULT '0', "parkingLotId" uuid NOT NULL, "paymentId" uuid NOT NULL, CONSTRAINT "REL_d729e9aa02f544f35c89c88aa0" UNIQUE ("paymentId"), CONSTRAINT "PK_376d72659be38251860f63ab014" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parking_lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_27af37fbf2f9f525c1db6c20a48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_bc10e84eb866599a06689b2c4e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "display_boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "handicappedSpot" jsonb NOT NULL, "compactSpot" jsonb NOT NULL, "largeSpot" jsonb NOT NULL, "motorcycleSpot" jsonb NOT NULL, CONSTRAINT "PK_547f57c5d0c85633fa3d0d6e1ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "type" character varying NOT NULL DEFAULT 'PUBLIC', "name" character varying NOT NULL, "key" character varying NOT NULL, "hash" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "startDate" TIMESTAMP WITH TIME ZONE, "endDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849" UNIQUE ("key"), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_652b373e9f8ff0b32625a11f834" FOREIGN KEY ("parkingSpotId") REFERENCES "parking_spots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_spots" ADD CONSTRAINT "FK_81fa507279f88fa36c1be3f2872" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_rates" ADD CONSTRAINT "FK_2684bb666ec9f063fcae492c7f7" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_539a88ed1e9e5e42e850b767084" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entrances" ADD CONSTRAINT "FK_a83b934162b11a389012e374cb1" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_tickets" ADD CONSTRAINT "FK_0ff58d5df344abfd505d09ffa4a" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_tickets" ADD CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exits" ADD CONSTRAINT "FK_d117a8a87c839f1d17c9f60a2ad" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exits" DROP CONSTRAINT "FK_d117a8a87c839f1d17c9f60a2ad"`);
        await queryRunner.query(`ALTER TABLE "parking_tickets" DROP CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e"`);
        await queryRunner.query(`ALTER TABLE "parking_tickets" DROP CONSTRAINT "FK_0ff58d5df344abfd505d09ffa4a"`);
        await queryRunner.query(`ALTER TABLE "entrances" DROP CONSTRAINT "FK_a83b934162b11a389012e374cb1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_539a88ed1e9e5e42e850b767084"`);
        await queryRunner.query(`ALTER TABLE "parking_rates" DROP CONSTRAINT "FK_2684bb666ec9f063fcae492c7f7"`);
        await queryRunner.query(`ALTER TABLE "parking_spots" DROP CONSTRAINT "FK_81fa507279f88fa36c1be3f2872"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_652b373e9f8ff0b32625a11f834"`);
        await queryRunner.query(`DROP TABLE "api_keys"`);
        await queryRunner.query(`DROP TABLE "display_boards"`);
        await queryRunner.query(`DROP TABLE "exits"`);
        await queryRunner.query(`DROP TABLE "parking_lots"`);
        await queryRunner.query(`DROP TABLE "parking_tickets"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "entrances"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "parking_rates"`);
        await queryRunner.query(`DROP TABLE "parking_spots"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
