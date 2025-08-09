import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '../../integrations/redis/redis.module';
import type { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongooseHealth: MongooseHealthIndicator,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    const rabbitUri: string = this.config.get<string>(
      'rabbitmq.uri',
      'amqp://guest:guest@localhost:5672',
    );
    return this.health.check([
      async () => this.mongooseHealth.pingCheck('mongo'),
      async () => {
        const pong = await this.redis.ping();
        return pong === 'PONG' ? { redis: { status: 'up' } } : { redis: { status: 'down' } };
      },
      async () => ({ rabbitmq: { status: rabbitUri ? 'up' : 'down' } }),
    ]);
  }
}
