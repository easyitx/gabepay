import { Metadata } from "next";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | GabePay",
  description: "Политика конфиденциальности сервиса пополнения Steam GabePay",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Политика конфиденциальности
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
              персональных данных пользователей сервиса GabePay (далее — «Сервис»). 
              Используя наш сервис, вы соглашаетесь с условиями данной политики.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Сбор персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Мы собираем следующие категории персональных данных:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Steam ID и связанная с ним информация</li>
              <li>Данные о транзакциях и платежах</li>
              <li>IP-адрес и техническая информация об устройстве</li>
              <li>Данные об использовании сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Цели обработки данных</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Персональные данные обрабатываются в следующих целях:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Предоставление услуг по пополнению Steam кошелька</li>
              <li>Обработка платежей и проведение транзакций</li>
              <li>Предотвращение мошенничества и обеспечение безопасности</li>
              <li>Улучшение качества сервиса</li>
              <li>Соблюдение требований законодательства</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, 
              необходимых для обработки платежей через платежные системы, или при наличии 
              законных требований государственных органов.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Защита данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы применяем современные технические и организационные меры для защиты 
              ваших персональных данных от несанкционированного доступа, изменения, 
              раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Сроки хранения данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Персональные данные хранятся в течение периода, необходимого для достижения 
              целей их обработки, но не более 5 лет с момента последнего обращения к сервису.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Ваши права</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Вы имеете право:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Получать информацию об обработке ваших персональных данных</li>
              <li>Требовать исправления неточных данных</li>
              <li>Требовать удаления ваших персональных данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Использование cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Наш сайт использует файлы cookie для улучшения пользовательского опыта 
              и анализа трафика. Вы можете отключить cookies в настройках браузера.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Изменения в политике</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы оставляем за собой право вносить изменения в данную политику. 
              Актуальная версия всегда доступна на нашем сайте.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Контактная информация</h2>
            <p className="text-muted-foreground leading-relaxed">
              По вопросам обработки персональных данных обращайтесь к нам через 
              форму обратной связи на сайте или в службу поддержки.
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