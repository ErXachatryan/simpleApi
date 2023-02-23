import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('SERVER_LOCAL_PORT');
  const config = new DocumentBuilder() // ToDo: take this out from here
    .setTitle('A Simple api example')
    .setDescription('A simple API description')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .addTag('Simple api')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () =>
    console.log(`server listening on port: ${port}`),
  );
}
bootstrap();
