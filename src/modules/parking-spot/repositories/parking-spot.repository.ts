import { BaseRepository } from '../../../common/base/repository/base.repository.abstract';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeleteResult,
    FindManyOptions,
    InsertResult,
    Repository,
    UpdateResult,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';
import { IParkingSpotRepository } from '../interfaces/parking-spot.repository.interface';

@Injectable()
export class ParkingSpotRepository
    extends BaseRepository<ParkingSpotEntity>
    implements IParkingSpotRepository
{
    constructor(
        @InjectRepository(ParkingSpotEntity)
        private readonly parkingSpotRepo: Repository<ParkingSpotEntity>
    ) {
        super();
    }

    async findAll(
        find?: FindManyOptions<ParkingSpotEntity>
    ): Promise<ParkingSpotEntity[]> {
        return await this.parkingSpotRepo.find(find);
    }

    findOneById(id: string) {
        throw new Error('Method not implemented.');
    }
    findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    ) {
        throw new Error('Method not implemented.');
    }
    create(entity: ParkingSpotEntity): Promise<InsertResult> {
        throw new Error('Method not implemented.');
    }
    update(
        id: string,
        entity: Partial<ParkingSpotEntity>
    ): Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<DeleteResult> {
        throw new Error('Method not implemented.');
    }
}
