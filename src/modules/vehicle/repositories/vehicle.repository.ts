import { BaseRepository } from '../../../common/base/repository/base.repository.abstract';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { VehicleEntity } from '../entities/vehicle.entity';
import { IVehicleRepository } from '../interfaces/vehicle.repository.interface';
import { ParkingTicketEntity } from 'src/modules/parking-ticket/entities/parking-ticket.entity';

@Injectable()
export class VehicleRepository
    extends BaseRepository<VehicleEntity>
    implements IVehicleRepository
{
    constructor(
        @InjectRepository(VehicleEntity)
        private readonly vehicleRepo: Repository<VehicleEntity>
    ) {
        super();
    }

    async findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    ) {
        const { _limit, _offset, _order } = pagination;
        return await this.vehicleRepo.findAndCount({
            where: find,
            take: _limit,
            skip: _offset,
            order: _order,
            select: options.select,
        });
    }

    async findOneById(id: string): Promise<VehicleEntity> {
        return await this.vehicleRepo.findOneBy({ id });
    }

    async create(vehicle: VehicleEntity) {
        return await this.vehicleRepo.insert(vehicle);
    }

    async update(
        id: string,
        Vehicle: Partial<VehicleEntity>
    ): Promise<UpdateResult> {
        return await this.vehicleRepo.update(id, Vehicle);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.vehicleRepo.delete(id);
    }
}
