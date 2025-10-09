export interface SteamValidateAccountReq {
  account: string;
}

export interface SteamValidateAccountRes {
  valid: boolean; // Аккаунт найден | Аккаунт не найден
  account: string;
  service: "Steam";
}

export interface SteamValidateAccountErrorRes {
  valid: boolean;
  error: string;
  code: number;
}
