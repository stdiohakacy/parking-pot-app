import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePaymentIdColumn1689865517626 implements MigrationInterface {
    name = 'UpdatePaymentIdColumn1689865517626';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" DROP CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ALTER COLUMN "paymentId" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ADD CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" DROP CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ALTER COLUMN "paymentId" SET NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ADD CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
