/**
 * Применяет скидку промокода к общей сумме комиссии
 * @param totalCommission - общая сумма комиссии (сервисная + эквайринг)
 * @param discountPercent - процент скидки (например, 2 для 2%)
 * @returns новая сумма комиссии с учетом скидки
 */
export const applyPromoCodeDiscount = (totalCommission: number, discountPercent: number): number => {
    if (totalCommission <= 0 || discountPercent <= 0 || discountPercent > 100) {
    return totalCommission;
  }
  
  const discount = (totalCommission * discountPercent) / 100;
  const discountedCommission = totalCommission - discount;
  
  // Округляем до 2 знаков после запятой
  return Math.round(discountedCommission * 100) / 100;
};

/**
 * Рассчитывает общую сумму с учетом промокода и экономию
 * @param originalAmount - исходная сумма
 * @param totalCommission - общая комиссия (сервисная + эквайринг)
 * @param discountPercent - процент скидки
 * @returns объект с итоговой суммой и суммой экономии
 */
export const calculateAmountWithPromoCode = (
  originalAmount: number,
  totalCommission: number,
  discountPercent: number
): { totalAmount: number; savedAmount: number } => {
  const discountedCommission = applyPromoCodeDiscount(totalCommission, discountPercent);
  const savedAmount = totalCommission - discountedCommission;
  const totalAmount = originalAmount + discountedCommission;
  
  return {
    totalAmount: Math.round(totalAmount * 100) / 100,
    savedAmount: Math.round(savedAmount * 100) / 100,
  };
};

/**
 * Проверяет валидность формата промокода
 * @param promoCode - промокод для проверки
 * @returns true если формат валиден
 */
export const isValidPromoCodeFormat = (promoCode: string): boolean => {
  if (!promoCode || typeof promoCode !== 'string') {
    return false;
  }
  
  // Промокод может содержать только буквы, цифры и дефисы
  // Длина от 3 до 20 символов
  const promoCodeRegex = /^[A-Za-z0-9-]{3,20}$/;
  return promoCodeRegex.test(promoCode.trim());
};

/**
 * Форматирует промокод (приводит к верхнему регистру и убирает пробелы)
 * @param promoCode - промокод для форматирования
 * @returns отформатированный промокод
 */
export const formatPromoCode = (promoCode: string): string => {
  if (!promoCode || typeof promoCode !== 'string') {
    return '';
  }
  
  return promoCode.trim().toUpperCase();
};

/**
 * Проверяет, истек ли промокод
 * @param expiryDate - дата истечения промокода (ISO string или Date)
 * @returns true если промокод истек
 */
export const isPromoCodeExpired = (expiryDate?: string | Date): boolean => {
  if (!expiryDate) {
    return false; // Если дата не указана, считаем что промокод не истекает
  }
  
  const expiry = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  return expiry < new Date();
};

/**
 * Валидирует промокод на клиенте перед отправкой на сервер
 * @param promoCode - промокод для валидации
 * @returns объект с результатом валидации и сообщением об ошибке
 */
export const validatePromoCodeClient = (promoCode: string): { isValid: boolean; error?: string } => {
  if (!promoCode || !promoCode.trim()) {
    return { isValid: false, error: 'Введите промокод' };
  }
  
  const trimmedCode = promoCode.trim();
  
  if (trimmedCode.length < 3) {
    return { isValid: false, error: 'Промокод должен содержать минимум 3 символа' };
  }
  
  if (trimmedCode.length > 20) {
    return { isValid: false, error: 'Промокод не может быть длиннее 20 символов' };
  }
  
  if (!isValidPromoCodeFormat(trimmedCode)) {
    return { isValid: false, error: 'Промокод может содержать только буквы, цифры и дефисы' };
  }
  
  return { isValid: true };
};