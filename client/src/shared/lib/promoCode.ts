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