import { Module } from '@nestjs/common';
import { CashinoutApiService } from './cashinout-api.service';
import { CashinoutService } from './cashinout.service';
import { CashinoutHandlerService } from './cashinout-handler.service';

@Module({
  providers: [CashinoutService, CashinoutApiService, CashinoutHandlerService],
  exports: [CashinoutService, CashinoutApiService, CashinoutHandlerService],
})
export class CashinoutModule {}
