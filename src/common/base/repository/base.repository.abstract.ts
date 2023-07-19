import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { BaseDTO } from '../dto/base.dto';
import { PaginationListDTO } from 'src/common/pagination/dtos/pagination.list.dto';

export abstract class BaseRepository<DTO extends BaseDTO> {
    abstract findOneById(id: string);

    abstract findAllAndCount(
        find: Record<string, any>,
        pagination: PaginationListDTO,
        options?: Record<string, any>
    );

    abstract create(entity: DTO): Promise<InsertResult>;

    abstract update(id: string, entity: Partial<DTO>): Promise<UpdateResult>;

    abstract delete(id: string): Promise<DeleteResult>;
}
