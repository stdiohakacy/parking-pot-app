import { BaseRepository } from '../../../common/base/repository/base.repository.abstract';
import { EntranceEntity } from '../entities/entrance.entity';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IEntranceRepository } from '../interfaces/entrance.repository.interface';
import { Injectable } from '@nestjs/common';
import { EntranceCreateDTO } from '../dtos/entrance.create.dto';

@Injectable()
export class EntranceRepository
    extends BaseRepository<EntranceEntity>
    implements IEntranceRepository
{
    constructor(
        @InjectRepository(EntranceEntity)
        private readonly entranceRepo: Repository<EntranceEntity>
    ) {
        super();
    }
    async findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO
    ) {
        const { _limit, _offset, _order } = pagination;
        return await this.entranceRepo.findAndCount({
            where: find,
            take: _limit,
            skip: _offset,
            order: _order,
        });
    }
    async findOneById(id: string): Promise<EntranceEntity> {
        return await this.entranceRepo.findOneBy({ id });
    }
    async create(entrance: EntranceCreateDTO) {
        return await this.entranceRepo.insert(entrance);
    }
    async update(
        id: string,
        entrance: Partial<EntranceEntity>
    ): Promise<UpdateResult> {
        return await this.entranceRepo.update(id, entrance);
    }
    async delete(id: string): Promise<DeleteResult> {
        return await this.entranceRepo.delete(id);
    }
}
