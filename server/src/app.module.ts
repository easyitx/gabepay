import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AcquiringModule } from './acquiring/acquiring.module';
import { SteamAcquiringModule } from './steam-acquiring/steam-acquiring.module';
import { SteamValidateModule } from './steam-validate/steam-validate.module';
import { DatabaseModule } from '../lib/database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AcquiringModule,
    SteamAcquiringModule,
    SteamValidateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
