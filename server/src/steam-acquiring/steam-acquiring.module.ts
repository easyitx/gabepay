import { Module } from '@nestjs/common';
import { SteamAcquiringApiService } from './steam-acquiring-api.service';
import { SteamAcquiringService } from './steam-acquiring.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SteamAcquiringService, SteamAcquiringApiService],
  exports: [SteamAcquiringService],
})
export class SteamAcquiringModule {}
