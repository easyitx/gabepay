import { Module } from '@nestjs/common';
import { CashinoutApiService } from './cashinout-api.service';
import { CashinoutService } from './cashinout.service';

@Module({
  providers: [CashinoutService, CashinoutApiService],
  exports: [CashinoutService, CashinoutApiService],
})
export class CashinoutModule {}
