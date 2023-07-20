import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ParkingSpotRepository } from '../../modules/parking-spot/repositories/parking-spot.repository';
import { CompactSpot } from '../../modules/parking-spot/instances/compact.spot';
import { ParkingLotRepository } from 'src/modules/parking-lot/repositories/parking-lot.repository';
import { faker } from '@faker-js/faker';
import { LargeSpot } from 'src/modules/parking-spot/instances/large.spot';
import { MotorCycleSpot } from 'src/modules/parking-spot/instances/motor-cycle.spot';
import { HandicappedSpot } from 'src/modules/parking-spot/instances/handicapped.spot';
import { ParkingSpotEntity } from 'src/modules/parking-spot/entities/parking-spot.entity';

@Injectable()
export class MigrationParkingSpotSeed {
    constructor(
        private readonly parkingSpotRepo: ParkingSpotRepository,
        private readonly parkingLotRepo: ParkingLotRepository
    ) {}

    @Command({ command: 'seed:parking-spot', describe: 'seed parking spots' })
    async seeds(): Promise<void> {
        const parkingLot = await this.parkingLotRepo.findOneByName(
            'Parking lot 01'
        );

        const seedParkingSpots = async (
            spotType: new (params: any) => ParkingSpotEntity
        ) => {
            for (let i = 0; i < 10; i++) {
                const parkingSpot = new spotType({
                    id: faker.string.uuid(),
                    parkingLotId: parkingLot.id,
                    isFree: true,
                });
                await this.parkingSpotRepo.create(parkingSpot);
            }
        };

        await Promise.all([
            seedParkingSpots(CompactSpot),
            seedParkingSpots(LargeSpot),
            seedParkingSpots(MotorCycleSpot),
            seedParkingSpots(HandicappedSpot),
        ]);
    }

    @Command({
        command: 'remove:parking-spot',
        describe: 'remove parking spots',
    })
    async remove(): Promise<void> {
        try {
            return await this.parkingSpotRepo.truncate();
        } catch (err: any) {
            console.error(err);
            throw new Error(err.message);
        }
    }
}
