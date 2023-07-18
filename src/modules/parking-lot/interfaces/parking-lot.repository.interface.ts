import { ParkingLotEntity } from '../entities/parking-lot.entity';

export interface IParkingLotRepository {
    findOneByName(name: string): Promise<ParkingLotEntity>;
}
