import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  let adapter = new FastifyAdapter() as NestApplicationOptions;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*', // Autorise toutes les origines, à remplacer en prod
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // Spécifie les headers autorisés
    credentials: true, // Si tu utilises des cookies ou des sessions
  });

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
