import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    forbidUnknownValues:false,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  await app.listen(3000);
}
bootstrap();
