import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SportsModule } from './sports/sports.module';
import { ClassModule } from './class/class.module';
import { HealthModule } from './health/health.module';
import { UsersenrollModule } from './usersenroll/usersenroll.module';
import { ConfigModule } from '@nestjs/config';
import { IsAdminMiddleware } from './middlewares/isAdmin.middleware';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    SportsModule,
    ClassModule,
    UsersenrollModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAdminMiddleware).forRoutes(
      // users
      { path: 'users/users', method: RequestMethod.GET },
      { path: 'users/user/:userId', method: RequestMethod.GET },
      { path: 'users/user/:userId', method: RequestMethod.PATCH },
      { path: 'users/user/:userId', method: RequestMethod.DELETE },
      // sports
      { path: 'sports/sport', method: RequestMethod.POST },
      { path: 'sports/sport/:sportId', method: RequestMethod.PATCH },
      { path: 'sports/sport/:sportId', method: RequestMethod.DELETE },
      // classes
      { path: 'classes/class', method: RequestMethod.POST },
      { path: 'classes/class/:classId', method: RequestMethod.PATCH },
      { path: 'classes/class/:classId', method: RequestMethod.DELETE },
      // enrolled
      { path: 'users-enroll/comments/:classId', method: RequestMethod.GET },
    );
  }
}
