import { Module } from '@nestjs/common';
import { ServerConfigService } from './server_config.service';
import { ServerConfigController } from './server_config.controller';

@Module({
  providers: [ServerConfigService],
  controllers: [ServerConfigController]
})
export class ServerConfigModule {}
