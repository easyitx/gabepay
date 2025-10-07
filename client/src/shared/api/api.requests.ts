import { ApiService } from "./api.service";
import { AcquiringCreatePayReq } from "@/shared/api/acquiring.interface";
import { SteamValidateAccountReq } from "@/shared/api/steam-validate.interface";

export const ApiRequests = {
  getMethods: () => ApiService.acquiringMethods.getMethods(),

  createNewInvoice: (data: AcquiringCreatePayReq) =>
    ApiService.createInvoice.createInvoice(data),

  validateAccount: (data: SteamValidateAccountReq) =>
    ApiService.steamValidate.validateAccount(data.account),
};
