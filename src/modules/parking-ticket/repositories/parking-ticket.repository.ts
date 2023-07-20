import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BaseRepository } from '../../../common/base/repository/base.repository.abstract';
import { ParkingTicketEntity } from '../entities/parking-ticket.entity';
import { IParkingTicketRepository } from '../interfaces/parking-ticket.repository.interface';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';

@Injectable()
export class ParkingTicketRepository
    extends BaseRepository<ParkingTicketEntity>
    implements IParkingTicketRepository
{
    constructor(
        @InjectRepository(ParkingTicketEntity)
        private readonly parkingTicketRepo: Repository<ParkingTicketEntity>
    ) {
        super();
    }

    async findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    ) {
        const { _limit, _offset, _order } = pagination;
        return await this.parkingTicketRepo.findAndCount({
            where: find,
            take: _limit,
            skip: _offset,
            order: _order,
            select: options.select,
        });
    }

    async findOneById(id: string): Promise<ParkingTicketEntity> {
        return await this.parkingTicketRepo.findOneBy({ id });
    }

    async create(parkingTicket: ParkingTicketEntity) {
        return await this.parkingTicketRepo.insert(parkingTicket);
    }

    async update(
        id: string,
        ParkingTicket: Partial<ParkingTicketEntity>
    ): Promise<UpdateResult> {
        return await this.parkingTicketRepo.update(id, ParkingTicket);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.parkingTicketRepo.delete(id);
    }

    async truncate(): Promise<void> {
        return await this.parkingTicketRepo.clear();
    }
}
