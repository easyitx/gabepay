import { Module } from '@nestjs/common';
import { PromoCodeController } from './promo-code.controller';
import { PromoCodeService } from './promo-code.service';
import { DatabaseModule } from '../../lib/database';
import { PromoCode, PromoCodeSchema } from './promo-code.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: PromoCode.name, schema: PromoCodeSchema }])
  ],
  controllers: [PromoCodeController],
  providers: [PromoCodeService],
  exports: [PromoCodeService],
})
export class PromoCodeModule {}