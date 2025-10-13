export interface PromoCodeActivateReq {
  code: string;
}

export interface PromoCodeActivateRes {
  success: boolean;
  code: string; // Активированный промокод
  discount: number; // Процент скидки (например, 2 для 2%)
  message: string;
}

export interface PromoCodeValidateReq {
  code: string;
}

export interface PromoCodeValidateRes {
  isValid: boolean;
  discount: number;
  message: string;
}