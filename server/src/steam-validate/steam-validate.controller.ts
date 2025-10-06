import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { BodyValidationInterceptor } from '../../lib/validation/validation.interceptor';
import { SteamValidateService } from './steam-validate.service';
import { SteamValidateAccountReq } from './steam-validate.interface';

@Controller('steam-validate')
export class SteamValidateController {
  constructor(private readonly steamValidateService: SteamValidateService) {}

  @Post()
  @UseInterceptors(new BodyValidationInterceptor(SteamValidateAccountReq))
  async validateAccount(@Body() data: SteamValidateAccountReq) {
    return this.steamValidateService.validateAccount(data);
  }
}
