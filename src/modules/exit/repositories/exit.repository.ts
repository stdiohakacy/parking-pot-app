import { BaseRepository } from '../../../common/base/repository/base.repository.abstract';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IExitRepository } from '../interfaces/entrance.repository.interface';
import { ExitEntity } from '../entities/exit.entity';
import { ExitCreateDTO } from '../dtos/exit.create.dto';

@Injectable()
export class ExitRepository
    extends BaseRepository<ExitEntity>
    implements IExitRepository
{
    constructor(
        @InjectRepository(ExitEntity)
        private readonly exitRepo: Repository<ExitEntity>
    ) {
        super();
    }

    async findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    ) {
        const { _limit, _offset, _order } = pagination;
        return await this.exitRepo.findAndCount({
            where: find,
            take: _limit,
            skip: _offset,
            order: _order,
            select: options.select,
        });
    }

    async findOneById(id: string): Promise<ExitEntity> {
        return await this.exitRepo.findOneBy({ id });
    }

    async create(Exit: ExitCreateDTO) {
        return await this.exitRepo.insert(Exit);
    }

    async update(id: string, Exit: Partial<ExitEntity>): Promise<UpdateResult> {
        return await this.exitRepo.update(id, Exit);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.exitRepo.delete(id);
    }
}
