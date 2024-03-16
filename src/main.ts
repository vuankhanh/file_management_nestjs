import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './shared/interceptors/format_response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  //Global Interceptor
  app.useGlobalInterceptors(new FormatResponseInterceptor())
  
  const port = AppModule.port;
  console.log(`App is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
