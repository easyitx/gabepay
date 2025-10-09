import { $api } from "@/shared/api/api.instance";
import { AxiosResponse } from "axios";

import {
  SteamValidateAccountReq,
  SteamValidateAccountRes,
} from "@/shared/api/steam-validate.interface";
import {
  AcquiringCreatePayReq,
  AcquiringCreatePayRes,
  AcquiringMethod,
} from "@/entities/acquiringMethod";

export const ApiRequests = {
  getMethods: async (): Promise<AxiosResponse<AcquiringMethod[]>> => {
    try {
      const response = await $api.get<AxiosResponse<AcquiringMethod[]>>(
        "/acquiring/methods"
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createNewInvoice: async (
    data: AcquiringCreatePayReq
  ): Promise<AxiosResponse<AcquiringCreatePayRes>> => {
    try {
      const response = await $api.post<AxiosResponse<AcquiringCreatePayRes>>(
        "/acquiring/invoice",
        data
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  validateAccount: async (
    data: SteamValidateAccountReq
  ): Promise<AxiosResponse<SteamValidateAccountRes>> => {
    try {
      const response = await $api.post<AxiosResponse<SteamValidateAccountRes>>(
        "/steam-validate",
        data
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
