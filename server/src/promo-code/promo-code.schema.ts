import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromoCodeDocument = PromoCode & Document;

@Schema({ timestamps: true })
export class PromoCode {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  code: string;

  @Prop({ required: true, min: 0, max: 100 })
  discount: number; // процент скидки

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({
    required: false,
    default: function () {
      const date = new Date();
      date.setMonth(date.getMonth() + 3);
      return date;
    },
  })
  expiresAt?: Date;

  @Prop({ required: false, min: 0 })
  maxUses?: number; // максимальное количество использований

  @Prop({ required: true, default: 0, min: 0 })
  usedCount: number; // количество использований

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode);
