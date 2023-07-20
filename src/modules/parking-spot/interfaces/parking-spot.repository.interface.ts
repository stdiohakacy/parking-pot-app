import { ParkingSpotEntity } from '../entities/parking-spot.entity';

export interface IParkingSpotRepository {
    findAll(find?: Record<string, any>): Promise<ParkingSpotEntity[]>;
}
