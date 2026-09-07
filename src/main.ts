import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger UI para entorno visual interactivo
  const config = new DocumentBuilder()
    .setTitle('🌸 Floristería - API de Inventarios')
    .setDescription('Sistema de gestión de inventarios para Floristería con operaciones CRUD y control de existencias')
    .setVersion('1.0')
    .addTag('inventarios')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🌸 Servidor corriendo en: http://localhost:${port}`);
  console.log(`💻 Panel Visual (Dashboard): http://localhost:${port}`);
  console.log(`📖 Swagger UI (Entorno interactivo API): http://localhost:${port}/api`);
  console.log(`📦 Endpoint JSON: http://localhost:${port}/inventarios`);
}
bootstrap();
