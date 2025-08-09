import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const loggerOptionsFactory = (): winston.LoggerOptions => {
  const level: string = process.env.LOG_LEVEL ?? 'debug';
  return {
    level,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike('Flow', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  };
};

@Module({
  imports: [
    ConfigModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<winston.LoggerOptions> => loggerOptionsFactory(),
    }),
  ],
})
export class LoggerModule {}
