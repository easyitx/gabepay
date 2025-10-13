import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromoCode, PromoCodeDocument } from './promo-code.schema';
import { PromoCodeActivateReq, PromoCodeActivateRes, PromoCodeValidateReq, PromoCodeValidateRes } from './promo-code.interface';
import { AppException } from '../../lib/errors/appException';
import { ErrorCode } from '../../lib/errors/errorCodes';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectModel(PromoCode.name)
    private readonly promoCodeModel: Model<PromoCodeDocument>,
  ) {}

  // async onApplicationBootstrap() {
  //   await this.createPromoCode('GABEPAY', 2);
  // }

  /**
   * Активирует промокод
   */
  async activatePromoCode(data: PromoCodeActivateReq): Promise<PromoCodeActivateRes> {
    const formattedCode = data.code.trim().toUpperCase();
    
    const promoCode = await this.promoCodeModel.findOne({ code: formattedCode });
    
    if (!promoCode) {
      return {
        success: false,
        code: formattedCode,
        discount: 0,
        message: 'Промокод не найден'
      };
    }

    // Проверяем активность промокода
    if (!promoCode.isActive) {
      return {
        success: false,
        code: formattedCode,
        discount: 0,
        message: 'Промокод неактивен'
      };
    }

    // Проверяем срок действия
    if (promoCode.expiresAt && promoCode.expiresAt < new Date()) {
      return {
        success: false,
        code: formattedCode,
        discount: 0,
        message: 'Срок действия промокода истек'
      };
    }

    // Проверяем лимит использований
    if (promoCode.maxUses && promoCode.usedCount >= promoCode.maxUses) {
      return {
        success: false,
        code: formattedCode,
        discount: 0,
        message: 'Превышен лимит использований промокода'
      };
    }

    // Увеличиваем счетчик использований
    await this.promoCodeModel.updateOne(
      { _id: promoCode._id },
      { $inc: { usedCount: 1 } }
    );

    return {
      success: true,
      code: formattedCode,
      discount: promoCode.discount,
      message: `Промокод активирован! Скидка ${promoCode.discount}% на комиссию`
    };
  }

  /**
   * Валидирует промокод без активации
   */
  async validatePromoCode(data: PromoCodeValidateReq): Promise<PromoCodeValidateRes> {
    const formattedCode = data.code.trim().toUpperCase();
    
    const promoCode = await this.promoCodeModel.findOne({ code: formattedCode });
    
    if (!promoCode) {
      return {
        isValid: false,
        discount: 0,
        message: 'Промокод не найден'
      };
    }

    if (!promoCode.isActive) {
      return {
        isValid: false,
        discount: 0,
        message: 'Промокод неактивен'
      };
    }

    if (promoCode.expiresAt && promoCode.expiresAt < new Date()) {
      return {
        isValid: false,
        discount: 0,
        message: 'Срок действия промокода истек'
      };
    }

    if (promoCode.maxUses && promoCode.usedCount >= promoCode.maxUses) {
      return {
        isValid: false,
        discount: 0,
        message: 'Превышен лимит использований промокода'
      };
    }

    return {
      isValid: true,
      discount: promoCode.discount,
      message: `Промокод действителен. Скидка ${promoCode.discount}%`
    };
  }

  /**
   * Создает новый промокод (для административных целей)
   */
  async createPromoCode(
    code: string,
    discount: number,
    options?: {
      expiresAt?: Date;
      maxUses?: number;
      description?: string;
    }
  ): Promise<PromoCode> {
    const formattedCode = code.trim().toUpperCase();
    
    const existingPromoCode = await this.promoCodeModel.findOne({ code: formattedCode });
    if (existingPromoCode) {
      throw new AppException({
        code: ErrorCode.VALIDATION_ERROR,
        details: { message: 'Промокод уже существует' }
      });
    }

    // Если срок действия не указан, устанавливаем 3 месяца по умолчанию
    const defaultExpiresAt = new Date();
    defaultExpiresAt.setMonth(defaultExpiresAt.getMonth() + 3);

    const promoCode = new this.promoCodeModel({
      code: formattedCode,
      discount,
      expiresAt: options?.expiresAt || defaultExpiresAt,
      maxUses: options?.maxUses,
      description: options?.description
    });

    return await promoCode.save();
  }

  /**
   * Получает информацию о промокоде
   */
  async getPromoCodeInfo(code: string): Promise<PromoCode | null> {
    const formattedCode = code.trim().toUpperCase();
    return await this.promoCodeModel.findOne({ code: formattedCode });
  }

  /**
   * Деактивирует промокод
   */
  async deactivatePromoCode(code: string): Promise<boolean> {
    const formattedCode = code.trim().toUpperCase();
    const result = await this.promoCodeModel.updateOne(
      { code: formattedCode },
      { isActive: false }
    );
    return result.modifiedCount > 0;
  }
}