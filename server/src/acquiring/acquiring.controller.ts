import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AcquiringService } from './acquiring.service';
import {
  AcquiringCreatePayReq,
  AcquiringCreatePayRes,
  AcquiringMethod,
} from './acquiring.interface';
import { BodyValidationInterceptor } from '../../lib/validation/validation.interceptor';

@Controller('acquiring')
export class AcquiringController {
  constructor(private readonly acquiringService: AcquiringService) {}

  @Post('invoice')
  @UseInterceptors(new BodyValidationInterceptor(AcquiringCreatePayReq))
  async createNewInvoice(
    @Body() data: AcquiringCreatePayReq,
  ): Promise<AcquiringCreatePayRes> {
    return await this.acquiringService.createNewInvoice(data);
  }

  @Get('methods')
  getPayMethods(): AcquiringMethod[] {
    return this.acquiringService.getPayMethods();
  }

  @Get('history')
  async getPaymentsHistory() {
    return await this.acquiringService.getPaymentsHistory();
  }

  @Get('currencies')
  async getAllCurrencies() {
    return this.acquiringService.getAllCurrencies();
  }
}
