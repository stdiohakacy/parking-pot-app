import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { BaseDTO } from '../dto/base.dto';
import { PaginationListDTO } from '../../../common/pagination/dtos/pagination.list.dto';

export abstract class BaseRepository<T> {
    abstract findOneById(id: string);

    abstract findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    );

    abstract create(entity: T): Promise<InsertResult>;

    abstract update(id: string, entity: Partial<T>): Promise<UpdateResult>;

    abstract delete(id: string): Promise<DeleteResult>;

    abstract truncate(): Promise<void>;
}
