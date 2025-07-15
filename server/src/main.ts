import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_SIDE_URL, // Or use '*' if you want to allow all origins
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 MomSays server is running on: ${process.env.PORT}? http://localhost:${process.env.PORT} : ${process.env.SERVER_SIDE_URL}}`);
}
bootstrap();
