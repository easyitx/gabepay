import { BaseApiService } from "@/shared/api/base-api.service";
import { SteamValidateAccountReq, SteamValidateAccountRes } from "../types";

export class ValidateSteamAccountApi extends BaseApiService<
  SteamValidateAccountReq,
  SteamValidateAccountRes
> {
  protected readonly endpoint = "/steam-validate";
  protected readonly method = "POST" as const;

  async validateAccount(account: string): Promise<SteamValidateAccountRes> {
    return this.makeRequest({ account });
  }
}
