import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { WinstonModule } from 'nest-winston';
import { loggerOptionsFactory } from './core/logger/logger.module';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerOptionsFactory()),
  });

  const configService: ConfigService = app.get(ConfigService);
  const port: number = Number(configService.get<string>('app.port', '3000'));

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(port);
  const logger: Logger = new Logger('Bootstrap');
  logger.log(`Server running on http://localhost:${port}`);
}

void bootstrap();
