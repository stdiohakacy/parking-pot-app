import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import configs from 'src/configs';
import { ENUM_MESSAGE_LANGUAGE } from './message/constants/message.enum.constant';
import { APP_LANGUAGE } from 'src/app/constants/app.constant';
import { DatabaseOptionsModule } from './database/database.options.module';
import { HelperModule } from './helper/helper.module';
import { PaginationModule } from './pagination/pagination.module';
import { ErrorModule } from './error/error.module';
import { MessageModule } from './message/message.module';
import { ResponseModule } from './response/response.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptionService } from './database/services/database.options.service';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                APP_ENV: Joi.string()
                    .valid(...Object.values(ENUM_APP_ENVIRONMENT))
                    .default('development')
                    .required(),
                APP_LANGUAGE: Joi.string()
                    .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
                    .default(APP_LANGUAGE)
                    .required(),

                HTTP_ENABLE: Joi.boolean().default(true).required(),
                HTTP_HOST: [
                    Joi.string().ip({ version: 'ipv4' }).required(),
                    Joi.valid('localhost').required(),
                ],
                HTTP_PORT: Joi.number().default(3000).required(),
                HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
                HTTP_VERSION: Joi.number().required(),

                DATABASE_HOST: Joi.string().default('127.0.0.1').required(),
                DATABASE_NAME: Joi.string()
                    .default('parking-lot-db')
                    .required(),
                DATABASE_USER: Joi.string().allow(null, 'postgres').optional(),
                DATABASE_PASSWORD: Joi.string()
                    .allow(null, 'postgres')
                    .optional(),

                AUTH_JWT_SUBJECT: Joi.string().required(),
                AUTH_JWT_AUDIENCE: Joi.string().required(),
                AUTH_JWT_ISSUER: Joi.string().required(),

                AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
                    .min(5)
                    .max(5000)
                    .required(),
                AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string()
                    .default('15m')
                    .required(),

                AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
                    .min(5)
                    .max(5000)
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string()
                    .default('7d')
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string()
                    .default('15m')
                    .required(),

                AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean()
                    .default(false)
                    .required(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string()
                    .allow(null, '')
                    .min(20)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string()
                    .allow(null, '')
                    .min(16)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string()
                    .allow(null, '')
                    .min(20)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string()
                    .allow(null, '')
                    .min(16)
                    .max(50)
                    .optional(),

                AWS_CREDENTIAL_KEY: Joi.string().allow(null, '').optional(),
                AWS_CREDENTIAL_SECRET: Joi.string().allow(null, '').optional(),
                AWS_S3_REGION: Joi.string().allow(null, '').optional(),
                AWS_S3_BUCKET: Joi.string().allow(null, '').optional(),

                SSO_GOOGLE_CLIENT_ID: Joi.string().allow(null, '').optional(),
                SSO_GOOGLE_CLIENT_SECRET: Joi.string()
                    .allow(null, '')
                    .optional(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),

        TypeOrmModule.forRootAsync({
            imports: [DatabaseOptionsModule],
            useFactory: (dbOptionService: DatabaseOptionService) => {
                return dbOptionService.createOption();
            },
            inject: [DatabaseOptionService],
            dataSourceFactory: async (options) => {
                if (!options) {
                    throw new Error('Invalid options passed');
                }
                return addTransactionalDataSource(new DataSource(options));
            },
        }),
        DatabaseOptionsModule,
        HelperModule,
        PaginationModule,
        ErrorModule,
        MessageModule,
        ResponseModule,
    ],
})
export class CommonModule {}
