import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerConfig } from './config/docs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = new DocumentBuilder()
  //   .setTitle('Book Crud in nestjs')
  //   .setDescription('Api Description')
  //   .setVersion('1.0')
  //   .addTag('api')
  //   .addBearerAuth(
  //     {
  //       // I was also testing it without prefix 'Bearer ' before the JWT
  //       description: `Please enter token in following format: Bearer <JWT>`,
  //       name: 'Authorization',
  //       bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
  //       scheme: 'Bearer',
  //       type: 'http', // I`ve attempted type: 'apiKey' too
  //       in: 'Header'
  //     },
  //     'access-token', // This name here is important for matching up with @ApiBearerAuth() in controller!
  //   )
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document, {
  //   customJs: [
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  //   ],
  //   customCssUrl: [
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  //   ],
  // });
  // SwaggerModule.setup('api', app, document);

  SwaggerConfig.config(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
