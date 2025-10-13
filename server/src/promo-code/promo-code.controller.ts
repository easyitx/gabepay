import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeActivateReq, PromoCodeActivateRes, PromoCodeValidateReq, PromoCodeValidateRes } from './promo-code.interface';
import { BodyValidationInterceptor } from '../../lib/validation/validation.interceptor';

@Controller('promo-code')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post('activate')
  @UseInterceptors(new BodyValidationInterceptor(PromoCodeActivateReq))
  async activatePromoCode(@Body() data: PromoCodeActivateReq): Promise<PromoCodeActivateRes> {
    return await this.promoCodeService.activatePromoCode(data);
  }

  @Post('validate')
  @UseInterceptors(new BodyValidationInterceptor(PromoCodeValidateReq))
  async validatePromoCode(@Body() data: PromoCodeValidateReq): Promise<PromoCodeValidateRes> {
    return await this.promoCodeService.validatePromoCode(data);
  }
}