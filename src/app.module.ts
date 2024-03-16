import { Inject, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigProvider } from './providers/common/multer.provider';
import { RedisProvider } from './providers/cache/redis.provider';
import { MongodbProvider } from './providers/database/mongodb.provider';
import { FileManagementModule } from './modules/file_management/file_management.module';
import { DirectoryManagementModule } from './modules/directory_management/directory_management.module';
import { SftpConnectionModule } from './modules/sftp_connection/sftp_connection.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServerConfigModule } from './modules/server_config/server_config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbProvider,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: RedisProvider,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigProvider,
    }),
    AuthModule,
    FileManagementModule,
    DirectoryManagementModule,
    SftpConnectionModule,
    ServerConfigModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  logger: Logger = new Logger(AppModule.name);
  static port: number;
  constructor(
    @Inject(CACHE_MANAGER) cacheManager,
    private configService: ConfigService
  ) {
    AppModule.port = this.configService.get<number>('app.port');

    const client = cacheManager.store.getClient();

    client.on('error', (error: Error) => {
      this.logger.error(error.message);
    })
  }
}