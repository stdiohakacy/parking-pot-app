import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { RouterModule } from './router/router.module';

@Module({
    controllers: [],
    providers: [],
    imports: [CommonModule, RouterModule.forRoot()],
})
export class AppModule {}
