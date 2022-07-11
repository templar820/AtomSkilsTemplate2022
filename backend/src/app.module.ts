import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import CONSTANT from './config/CONSTANT';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/sequelize';
import AdminJS from 'adminjs';
import * as bcrypt from 'bcrypt';
import passwordsFeature from '@adminjs/passwords';
import * as argon2 from 'argon2';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: CONSTANT.POSTGRES_HOST,
      port: Number(CONSTANT.POSTGRES_PORT),
      database: CONSTANT.POSTGRES_DB,
      username: CONSTANT.POSTGRES_USER,
      password: CONSTANT.POSTGRES_PASSWORD,
      autoLoadModels: true,
    }),
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          {
            resource: User,
            options: {
              properties: { encrypted: { isVisible: false } },
            },
            features: [
              passwordsFeature({
                // PasswordsOptions
                properties: {
                  // to this field will save the hashed password
                  encryptedPassword: 'encrypted',
                },
                hash: argon2.hash,
              }),
            ],
          },

          Role,
          UserRoles,
        ],
      },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [SequelizeModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
