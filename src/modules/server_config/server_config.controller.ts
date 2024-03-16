import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('config')
export class ServerConfigController {
  @Get()
  @UseGuards(AuthGuard)
  config() {
    const config = {
      serverTime: Date.now()
    }

    return config;
  }
}
