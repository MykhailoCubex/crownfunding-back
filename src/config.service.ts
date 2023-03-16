import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const options = {
      type: 'mysql',
      url: this.getValue('DATABASE_URL'),
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      ssl: false,
      migrationsRun: true,
      logging: ['error'],
      logger: 'advanced-console',
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
    return options as TypeOrmModuleOptions;
  }

  getDataSourceConfig() {
    const options: DataSourceOptions = {
      type: 'mysql',
      url: this.getValue('DATABASE_URL'),
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      ssl: false,
      migrationsRun: true,
      logging: ['error'],
      logger: 'advanced-console',
    };

    return options;
  }

  getAppConfig = () => ({
    clientHost: this.getValue('CLIENT_HOST'),
    domain: this.getValue('DOMAIN'),
    anadeaEmail: this.getValue('ANADEA_EMAIL'),
  });
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',
]);

export { configService };
