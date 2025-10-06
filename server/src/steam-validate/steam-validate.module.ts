import { Module } from '@nestjs/common';
import { SteamValidateService } from './steam-validate.service';
import { SteamValidateController } from './steam-validate.controller';

@Module({
  controllers: [SteamValidateController],
  providers: [SteamValidateService],
})
export class SteamValidateModule {}
