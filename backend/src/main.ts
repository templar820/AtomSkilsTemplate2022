import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function start() {
  const PORT = process.env.BACKEND_PORT || 5000;

  const doc = new DocumentBuilder()
    .setTitle('HackTemplate')
    .setDescription('REST API DOCS HackAtom2022')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log('Server started', PORT);
  });
}
start();
