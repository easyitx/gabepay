import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from 'lib/errors/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Глобальный фильтр ошибок
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get('PORT') || 3021;

  await app.listen(parseInt(port), () =>
    console.debug(`\x1b[36m*** Started on port: ${port} ***\x1b[0m`),
  );
}
void bootstrap();
