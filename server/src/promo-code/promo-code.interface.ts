import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class PromoCodeActivateReq {
  @IsString()
  @IsNotEmpty({ message: 'Введите промокод' })
  @Length(3, 20, { message: 'Промокод должен содержать от 3 до 20 символов' })
  @Matches(/^[A-Z0-9-]+$/, { message: 'Промокод может содержать только буквы, цифры и дефисы' })
  code: string;
}

export interface PromoCodeActivateRes {
  success: boolean;
  code: string;
  discount: number;
  message: string;
}

export class PromoCodeValidateReq {
  @IsString()
  @IsNotEmpty({ message: 'Введите промокод' })
  @Length(3, 20, { message: 'Промокод должен содержать от 3 до 20 символов' })
  @Matches(/^[A-Z0-9-]+$/, { message: 'Промокод может содержать только буквы, цифры и дефисы' })
  code: string;
}

export interface PromoCodeValidateRes {
  isValid: boolean;
  discount: number;
  message: string;
}