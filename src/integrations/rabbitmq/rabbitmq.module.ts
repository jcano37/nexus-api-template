import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule as GoluRabbitModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    ConfigModule,
    GoluRabbitModule.forRootAsync(GoluRabbitModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('rabbitmq.uri', 'amqp://guest:guest@localhost:5672'),
        connectionInitOptions: { wait: true, reject: true, timeout: 5000 },
        exchanges: [
          {
            name: config.get<string>('rabbitmq.exchange', 'flow.exchange'),
            type: 'topic',
          },
        ],
      }),
    }),
  ],
})
export class RabbitmqModule {}
