import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
  await app.listen(3100);
}
bootstrap();
