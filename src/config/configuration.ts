/* eslint-disable @typescript-eslint/naming-convention */
export interface AppConfig {
  readonly env: string;
  readonly app: { readonly name: string; readonly port: number };
  readonly mongo: { readonly uri: string; readonly dbName: string };
  readonly redis: { readonly url: string };
  readonly rabbitmq: { readonly uri: string; readonly exchange: string };
  readonly logger: { readonly level: string };
}

export default (): AppConfig => ({
  env: process.env.NODE_ENV ?? 'development',
  app: {
    name: process.env.APP_NAME ?? 'Nexus API',
    port: Number(process.env.APP_PORT ?? 3000),
  },
  mongo: {
    uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME ?? 'flow',
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI ?? 'amqp://guest:guest@localhost:5672',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'flow.exchange',
  },
  logger: {
    level: process.env.LOG_LEVEL ?? 'debug',
  },
});
