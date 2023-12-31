import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { initializeTransactionalContext } from 'typeorm-transactional';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import { AppModule } from './app.module';
import swaggerInit from './swagger';

async function bootstrap() {
    initializeTransactionalContext();
    const app: NestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const databaseUri: string = configService.get<string>('database.host');
    const env: string = configService.get<string>('app.env');
    // const host: string = configService.get<string>('app.http.host');
    const port: number = configService.get<number>('app.http.port');
    const globalPrefix: string = configService.get<string>('app.globalPrefix');
    const versioningPrefix: string = configService.get<string>(
        'app.versioning.prefix'
    );
    const version: string = configService.get<string>('app.versioning.version');

    // enable
    const httpEnable: boolean = configService.get<boolean>('app.http.enable');
    const versionEnable: string = configService.get<string>(
        'app.versioning.enable'
    );
    const documentationEnable: boolean = configService.get<boolean>(
        'app.documentationEnable'
    );

    const logger = new Logger();
    process.env.NODE_ENV = env;

    // Global
    app.setGlobalPrefix(globalPrefix);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        })
    );
    app.use(compression());
    app.use(morgan('combined'));

    // Versioning
    if (versionEnable) {
        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: version,
            prefix: versioningPrefix,
        });
    }

    // Swagger
    if (documentationEnable) {
        await swaggerInit(app);
    }

    // Listen
    await app.listen(port);

    logger.log(`==========================================================`);
    logger.log(`Environment Variable`, 'NestApplication');
    // logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');
    logger.log(`==========================================================`);
    logger.log(
        `Http is ${httpEnable}, ${
            httpEnable ? 'routes registered' : 'no routes registered'
        }`,
        'NestApplication'
    );
    logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');
    logger.log(
        `Http Server running on ${await app.getUrl()}`,
        'NestApplication'
    );
    logger.log(`Database uri ${databaseUri}`, 'NestApplication');
    logger.log(`Documentation: http://localhost:${port}/documentation`);
    logger.log(`==========================================================`);
}
bootstrap();
