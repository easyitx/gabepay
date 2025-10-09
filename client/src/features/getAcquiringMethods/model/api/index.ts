import { BaseApiService } from "@/shared/api/base-api.service";
import {AcquiringMethod} from "@/entities/acquiringMethod";


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
