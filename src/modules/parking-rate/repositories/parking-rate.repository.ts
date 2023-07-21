import { UpdateResult, DeleteResult, Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/base/repository/base.repository.abstract';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { ParkingRateEntity } from '../entities/parking-rate.entity';
import { IParkingRateRepository } from '../interfaces/parking-rate.repository.interface';

@Injectable()
export class ParkingRateRepository
    extends BaseRepository<ParkingRateEntity>
    implements IParkingRateRepository
{
    constructor(
        @InjectRepository(ParkingRateEntity)
        private parkingRateRepo: Repository<ParkingRateEntity>
    ) {
        super();
    }

    findOneById(id: string) {
        throw new Error('Method not implemented.');
    }
    async findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    ) {
        const { _limit, _offset, _order } = pagination;
        return await this.parkingRateRepo.findAndCount({
            where: find,
            take: _limit,
            skip: _offset,
            order: _order,
            select: options.select,
        });
    }
    create(entity: ParkingRateEntity): Promise<InsertResult> {
        throw new Error('Method not implemented.');
    }
    update(
        id: string,
        entity: Partial<ParkingRateEntity>
    ): Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<DeleteResult> {
        throw new Error('Method not implemented.');
    }
    truncate(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
