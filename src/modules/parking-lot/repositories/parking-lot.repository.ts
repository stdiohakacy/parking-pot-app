import { UpdateResult, DeleteResult, Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IParkingLotRepository } from '../interfaces/parking-lot.repository.interface';
import { ParkingLotEntity } from '../entities/parking-lot.entity';
import { BaseRepository } from 'src/common/base/repository/base.repository.abstract';
import { ParkingLotCreateDTO } from '../dtos/parking-lot.create.dto';

@Injectable()
export class ParkingLotRepository
    extends BaseRepository<ParkingLotEntity>
    implements IParkingLotRepository
{
    constructor(
        @InjectRepository(ParkingLotEntity)
        private readonly parkingLotRepo: Repository<ParkingLotEntity>
    ) {
        super();
    }

    async findOneByName(name: string) {
        return await this.parkingLotRepo.findOneBy({ name });
    }

    async findOneById(id: string): Promise<ParkingLotEntity> {
        return await this.parkingLotRepo.findOneBy({ id });
    }

    async create(entity: ParkingLotCreateDTO): Promise<InsertResult> {
        return await this.parkingLotRepo.insert(
            this.parkingLotRepo.create(entity)
        );
    }

    async update(
        id: string,
        entity: Partial<ParkingLotEntity>
    ): Promise<UpdateResult> {
        return await this.parkingLotRepo.update(id, entity);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.parkingLotRepo.delete(id);
    }
}