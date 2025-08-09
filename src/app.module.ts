import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { LoggerModule } from './core/logger/logger.module';
import { MongoModule } from './integrations/mongo/mongo.module';
import { RedisModule } from './integrations/redis/redis.module';
import { RabbitmqModule } from './integrations/rabbitmq/rabbitmq.module';
import { HealthModule } from './modules/health/health.module';
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    LoggerModule,
    MongoModule,
    RedisModule,
    RabbitmqModule,
    HealthModule,
    AdminModule,
    SharedModule,
  ],
})
export class AppModule {}
