import { config } from 'dotenv';
config();
import { Injectable, Logger } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: TelegramBot;
  private readonly botToken: string = process.env.TELEGRAM_BOT_TOKEN || '';

  constructor() {
    if (!this.botToken) {
      return;
    }

    // Инициализация Telegram бота
    const botToken = this.botToken;
    if (botToken) {
      try {
        this.bot = new TelegramBot(botToken, { polling: true });
        this.setupBot();
      } catch (error) {
        this.logger.error('Failed to initialize Telegram bot', error);
      }
    }
  }

  private setupBot(): void {
    // Обработчик команды /start
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      this.sendMainMenu(chatId);
    });

    // Обработчик callback_query для inline кнопок
    this.bot.on('callback_query', (callbackQuery) => {
      const message = callbackQuery.message;
      if (!message) return;
      const data = callbackQuery.data;

      if (data === 'replenish') {
        this.handleReplenishButton(message.chat.id);
      } else if (data === 'back_to_main') {
        this.sendMainMenu(message.chat.id);
      }

      // Ответ на callback_query чтобы убрать "часики" у кнопки
      this.bot.answerCallbackQuery(callbackQuery.id).catch((error) => {
        this.logger.error('Error answering callback query', error);
      });
    });

    this.logger.log('Telegram bot setup completed');
  }

  private sendMainMenu(chatId: number): void {
    const menuText = `Добро пожаловать на самый выгодный сервис для пополнения кошелька steam!

Ниже комиссии чем у нас нет нигде!
Всего 2% на пополнение!

1. Создай кошелек Cashinout и пополни на нужную сумму!
2. На gabepay.ru выбери метод Cashinout и пополняй steam с лучшими условиями на рынке!
`;

    const menuOptions: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '💰 Пополнить steam',
              callback_data: 'replenish',
            },
          ],
          [
            {
              text: '🤖 Перейти в Cashinout',
              url: 'https://t.me/Cashinout_bot?start=194805',
            },
          ],
        ],
      },
      parse_mode: 'HTML',
    };

    this.bot.sendMessage(chatId, menuText, menuOptions).catch((error) => {
      this.logger.error('Error sending main menu', error);
    });
  }

  private handleReplenishButton(chatId: number): void {
    const websiteUrl = 'https://gabepay.ru';

    const messageText = `Для пополнения баланса перейдите по ссылке:`;

    const buttonOptions: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🌐 Перейти на сайт gabepay',
              url: websiteUrl,
            },
          ],
          [
            {
              text: '⬅️ Назад',
              callback_data: 'back_to_main',
            },
          ],
        ],
      },
      parse_mode: 'HTML',
    };

    this.bot.sendMessage(chatId, messageText, buttonOptions).catch((error) => {
      this.logger.error('Error handling replenish button', error);
    });
  }

  // Метод для обработки текстовых сообщений (опционально)
  public handleMessage(msg: TelegramBot.Message): void {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === 'Меню' || text === 'меню') {
      this.sendMainMenu(chatId);
    }
  }
}