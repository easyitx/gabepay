import { ValidateSteamAccountApi } from "@/features/validateSteamAccount/model/api";
import { AcquiringMethodsApi } from "@/features/acquiringMethods/model/api";
import { CreateInvoiceApi } from "@/features/createInvoice/model/api";

export class ApiService {
  private static _instance: ApiService;

  public readonly steamValidate: ValidateSteamAccountApi;
  public readonly acquiringMethods: AcquiringMethodsApi;
  public readonly createInvoice: CreateInvoiceApi;

  private constructor() {
    this.steamValidate = new ValidateSteamAccountApi();
    this.acquiringMethods = new AcquiringMethodsApi();
    this.createInvoice = new CreateInvoiceApi();
  }

  public static getInstance(): ApiService {
    if (!ApiService._instance) {
      ApiService._instance = new ApiService();
    }
    return ApiService._instance;
  }

  public static get steamValidate() {
    return ApiService.getInstance().steamValidate;
  }

  public static get acquiringMethods() {
    return ApiService.getInstance().acquiringMethods;
  }

  public static get createInvoice() {
    return ApiService.getInstance().createInvoice;
  }
}
