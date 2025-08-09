import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '../../integrations/redis/redis.module';

@Module({
  imports: [TerminusModule, MongooseModule, RedisModule],
  controllers: [HealthController],
})
export class HealthModule {}
