import { Injectable } from '@nestjs/common';

import { IApiKeyService } from 'src/common/api-key/interfaces/api-key.service.interface';
import { IApiKeyCreated } from 'src/common/api-key/interfaces/api-key.interface';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import {
    ApiKeyCreateDto,
    ApiKeyCreateRawDto,
} from 'src/common/api-key/dtos/api-key.create.dto';
import { ApiKeyUpdateDto } from 'src/common/api-key/dtos/api-key.update.dto';
import { ApiKeyUpdateDateDto } from 'src/common/api-key/dtos/api-key.update-date.dto';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { ApiKeyEntity } from 'src/modules/api-key/entities/api-key.entity';

@Injectable()
export class ApiKeyService implements IApiKeyService {
    private readonly env: string;

    constructor(
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService,
        private readonly helperHashService: HelperHashService,
        private readonly helperDateService: HelperDateService
    ) {
        this.env = this.configService.get<string>('app.env');
    }
    findAll(find?: Record<string, any>): Promise<ApiKeyEntity[]> {
        throw new Error('Method not implemented.');
    }
    findOneById(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findOne(find: Record<string, any>): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findOneByKey(key: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findOneByActiveKey(key: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    getTotal(find?: Record<string, any>): Promise<number> {
        throw new Error('Method not implemented.');
    }
    create({
        name,
        startDate,
        endDate,
    }: ApiKeyCreateDto): Promise<IApiKeyCreated> {
        throw new Error('Method not implemented.');
    }
    createRaw({
        name,
        key,
        secret,
        startDate,
        endDate,
    }: ApiKeyCreateRawDto): Promise<IApiKeyCreated> {
        throw new Error('Method not implemented.');
    }
    active(repository: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    inactive(repository: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    update(repository: any, { name }: ApiKeyUpdateDto): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateDate(
        repository: any,
        { startDate, endDate }: ApiKeyUpdateDateDto
    ): Promise<any> {
        throw new Error('Method not implemented.');
    }
    reset(repository: any, secret: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(repository: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    validateHashApiKey(
        hashFromRequest: string,
        hash: string
    ): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    createKey(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    createSecret(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    createHashApiKey(key: string, secret: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    deleteMany(find: Record<string, any>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    inactiveManyByEndDate(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
