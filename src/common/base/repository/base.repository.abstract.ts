import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { BaseDTO } from '../dto/base.dto';

export abstract class BaseRepository<DTO extends BaseDTO> {
    abstract findOneById(id: string);

    abstract create(entity: DTO): Promise<InsertResult>;

    abstract update(id: string, entity: Partial<DTO>): Promise<UpdateResult>;

    abstract delete(id: string): Promise<DeleteResult>;
}
