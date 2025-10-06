import { Injectable } from '@nestjs/common';
import { SteamAcquiringApiService } from './steam-acquiring-api.service';

@Injectable()
export class SteamAcquiringService {
  constructor(
    private readonly steamAcquiringApiService: SteamAcquiringApiService,
  ) {}
}
