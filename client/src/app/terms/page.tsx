import { Metadata } from "next";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | GabePay",
  description: "Пользовательское соглашение сервиса пополнения Steam GabePay",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Пользовательское соглашение
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует 
              отношения между администрацией сервиса GabePay (далее — «Сервис») и 
              пользователями сервиса. Используя наш сервис, вы принимаете условия 
              данного соглашения в полном объеме.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Описание сервиса</h2>
            <p className="text-muted-foreground leading-relaxed">
              GabePay — это сервис для пополнения баланса Steam кошелька с минимальной 
              комиссией. Мы предоставляем возможность пополнения Steam аккаунтов 
              различными способами оплаты с гарантией безопасности транзакций.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Условия использования</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Для использования сервиса пользователь обязуется:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Предоставлять достоверную информацию о своем Steam аккаунте</li>
              <li>Не использовать сервис для незаконных целей</li>
              <li>Не нарушать работу сервиса и не предпринимать попыток взлома</li>
              <li>Соблюдать требования Steam и не нарушать их правила</li>
              <li>Нести ответственность за безопасность своего аккаунта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Платежи и комиссии</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Условия оплаты:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Минимальная сумма пополнения составляет 30 рублей</li>
              <li>Комиссия сервиса составляет от 2% в зависимости от способа оплаты</li>
              <li>Все платежи обрабатываются через надежные платежные системы</li>
              <li>Возврат средств возможен только в случае технических ошибок сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Гарантии и ответственность</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Сервис гарантирует:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Зачисление средств на Steam аккаунт в течение 24 часов</li>
              <li>Безопасность проведения транзакций</li>
              <li>Конфиденциальность персональных данных</li>
              <li>Техническую поддержку пользователей</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Сервис не несет ответственности за блокировку Steam аккаунта пользователя 
              по причинам, не связанным с работой нашего сервиса.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Возврат средств</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Возврат средств осуществляется в следующих случаях:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Технические ошибки при обработке платежа</li>
              <li>Невозможность зачисления средств по вине сервиса</li>
              <li>Двойное списание средств</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Возврат не осуществляется, если средства были успешно зачислены на 
              Steam аккаунт пользователя.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Ограничения использования</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Запрещается:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Использование сервиса для отмывания денег</li>
              <li>Пополнение чужих аккаунтов без согласия владельца</li>
              <li>Использование украденных или поддельных платежных данных</li>
              <li>Попытки обхода системы безопасности</li>
              <li>Создание множественных аккаунтов для обхода ограничений</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Техническая поддержка</h2>
            <p className="text-muted-foreground leading-relaxed">
              Служба поддержки работает 24/7 и готова помочь с любыми вопросами, 
              связанными с использованием сервиса. Обращения обрабатываются в 
              порядке поступления в течение 24 часов.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Изменения в соглашении</h2>
            <p className="text-muted-foreground leading-relaxed">
              Администрация оставляет за собой право вносить изменения в данное 
              соглашение. Пользователи будут уведомлены о существенных изменениях 
              через сайт сервиса. Продолжение использования сервиса после внесения 
              изменений означает согласие с новыми условиями.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Разрешение споров</h2>
            <p className="text-muted-foreground leading-relaxed">
              Все споры решаются путем переговоров. В случае невозможности 
              достижения соглашения, споры подлежат рассмотрению в соответствии 
              с действующим законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Прекращение действия соглашения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Соглашение может быть расторгнуто по инициативе любой из сторон. 
              Администрация имеет право заблокировать доступ пользователя к сервису 
              в случае нарушения условий данного соглашения.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}