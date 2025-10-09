import { $api } from "./api.instance";

export abstract class BaseApiService<TRequest = void, TResponse = any> {
  protected abstract readonly endpoint: string;
  protected abstract readonly method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH";

  protected async makeRequest(data?: TRequest): Promise<TResponse> {
    const method = this.method.toLowerCase() as
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch";
    try {
      const response = await $api[method]<TResponse>(this.endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async makeRequestWithParams<TParams = Record<string, any>>(
    params: TParams,
    data?: TRequest
  ): Promise<TResponse> {
    const method = this.method.toLowerCase() as
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch";
    const response = await $api[method]<TResponse>(this.endpoint, data, {
      params,
    });
    return response.data;
  }
}
