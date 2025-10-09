import { AcquiringMethod } from "@/entities/acquiringMethod";
import { BaseApiService } from "@/shared/api/base-api.service";

export class AcquiringMethodsApi extends BaseApiService<
  void,
  AcquiringMethod[]
> {
  protected readonly endpoint = "/acquiring/methods";
  protected readonly method = "GET" as const;

  async getMethods(): Promise<AcquiringMethod[]> {
    return this.makeRequest();
  }
}
