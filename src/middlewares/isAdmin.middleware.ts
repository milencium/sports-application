import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token = '';

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please provide user token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokenParts = token.split(' ');

    if (tokenParts.length === 2) {
      const bearer = tokenParts[0];
      if (bearer === 'Bearer') {
        const decodedToken: any = jwt.verify(
          tokenParts[1],
          this.configService.get<string>('JWT_SECRET_KEY'),
        );

        const user = await this.prisma.user.findUnique({
          where: {
            id: decodedToken.payload.user,
          },
        });

        if (user.role === 'admin') {
          next();
        } else {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'User is not authorized admin',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Token is not valid',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
