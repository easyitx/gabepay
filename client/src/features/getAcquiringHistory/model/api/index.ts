import { IAcquiring } from "@/entities/acquiring/model/types";
import { BaseApiService } from "@/shared/api/base-api.service";

export class AcquiringHistoryApi extends BaseApiService<void, IAcquiring[]> {
  protected readonly endpoint = "/acquiring/history";
  protected readonly method = "GET" as const;

  async getAcquiringHistory(): Promise<IAcquiring[]> {
    return this.makeRequest();
  }
}
