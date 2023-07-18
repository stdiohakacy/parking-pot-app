import { UserEntity } from '../entities/user.entity';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { BaseRepository } from 'src/common/base/repository/base.repository.abstract';

@Injectable()
export class UserRepository
    extends BaseRepository<UserEntity>
    implements IUserRepository
{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {
        super();
    }

    async findOneByUsername(username: string): Promise<UserEntity> {
        return await this.userRepo.findOneBy({ username });
    }

    async findOneById(id: string): Promise<UserEntity> {
        return await this.userRepo.findOneBy({ id });
    }

    async create(userEntity: UserEntity) {
        return await this.userRepo.insert(userEntity);
    }

    async update(
        id: string,
        userEntity: Partial<UserEntity>
    ): Promise<UpdateResult> {
        return await this.userRepo.update(id, userEntity);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.userRepo.delete(id);
    }
}
