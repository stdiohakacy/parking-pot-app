import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ParkingLotRepository } from 'src/modules/parking-lot/repositories/parking-lot.repository';

@Injectable()
export class MigrationParkingLotSeed {
    constructor(private readonly parkingLotRepo: ParkingLotRepository) {}

    @Command({ command: 'seed:parking-lot', describe: 'seed parking lots' })
    async seeds(): Promise<void> {
        await this.parkingLotRepo.create({
            name: 'Parking lot 01',
            address: '01 Nguyen Hue',
        });
    }

    @Command({ command: 'remove:parking-lot', describe: 'remove parking lots' })
    async remove(): Promise<void> {
        try {
            return await this.parkingLotRepo.truncate();
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
