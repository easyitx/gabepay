import { RatedSteamCurrency } from "@/entities/ratedSteamCurrency/model/type/ratedSteamCurrency";
import { BaseApiService } from "@/shared/api/base-api.service";

export class AcquiringMethodsApi extends BaseApiService<
  void,
  RatedSteamCurrency[]
> {
  protected readonly endpoint = "/acquiring/currencies";
  protected readonly method = "GET" as const;

  async getRatedSteamCurrencies(): Promise<RatedSteamCurrency[]> {
    return this.makeRequest();
  }
}
