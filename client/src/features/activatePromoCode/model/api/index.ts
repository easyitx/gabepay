import { BaseApiService } from "@/shared/api/base-api.service";
import { PromoCodeActivateReq, PromoCodeActivateRes } from "@/entities/promoCode";

export class ActivatePromoCodeApi extends BaseApiService<
  PromoCodeActivateReq,
  PromoCodeActivateRes
> {
  protected readonly endpoint = "/promo-code/activate";
  protected readonly method = "POST" as const;

  async activatePromoCode(code: string): Promise<PromoCodeActivateRes> {
    return this.makeRequest({ code });
  }
}