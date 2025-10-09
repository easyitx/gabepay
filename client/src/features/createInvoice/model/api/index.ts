import { BaseApiService } from "@/shared/api/base-api.service";
import {
  AcquiringCreatePayReq,
  AcquiringCreatePayRes,
} from "@/shared/api/acquiring.interface";

export class CreateInvoiceApi extends BaseApiService<
  AcquiringCreatePayReq,
  AcquiringCreatePayRes
> {
  protected readonly endpoint = "/acquiring/invoice";
  protected readonly method = "POST" as const;

  async createInvoice(
    data: AcquiringCreatePayReq
  ): Promise<AcquiringCreatePayRes> {
    return this.makeRequest(data);
  }
}
