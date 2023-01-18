import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as sendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Register, Error, Login } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async register(
    email: string,
    username: string,
    category: string,
    password: string,
  ): Promise<Register | Error> {
    try {
      if (!email || !username || !category || !password) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide registration data',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        category !== 'children' &&
        category !== 'youth' &&
        category !== 'youngAdults' &&
        category !== 'adults'
      ) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please provide your category as: children, youth, youngAdults or adults',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userExists) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'User already exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const salt = 11;
      const hashedPassword = await bcrypt.hash(password, salt);
      const token = jwt.sign(
        {
          payload: {
            email: email,
            username: username,
            category: category,
            password: hashedPassword,
          },
        },
        this.configService.get<string>('JWT_SECRET_KEY'),
        {
          expiresIn: '1day',
        },
      );

      sendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));

      const emailVerification = {
        to: email,
        from: 'mile.druzijanic.fsblab@gmail.com',
        subject: 'Please verify your email registration',
        html: `<h2>This is your email verification link, please proceed to activate your profile </h2> <p>http://localhost:8080/auth/email-activate?token=${token}</p>`,
      };

      sendGrid.send(emailVerification);

      const response = { message: 'Proceed to your email to activate account' };

      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async emailActivate(token: any) {
    try {
      if (!token) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Token is not provided',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const decodedToken: any = jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET_KEY'),
      );

      if (
        decodedToken.payload.username ===
        this.configService.get<string>('ADMIN_USERNAME')
      ) {
        const createdUser: any = await this.prisma.user.create({
          data: {
            email: decodedToken.payload.email,
            username: decodedToken.payload.username,
            category: decodedToken.payload.category,
            password: decodedToken.payload.password,
            role: 'admin',
          },
        });

        const response = {
          message: 'Registration of admin successful',
        };

        return response;
      }

      const createdUser: any = await this.prisma.user.create({
        data: {
          email: decodedToken.payload.email,
          username: decodedToken.payload.username,
          category: decodedToken.payload.category,
          password: decodedToken.payload.password,
          role: 'user',
        },
      });

      const response = {
        message: 'Registration of user successful',
      };

      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(email: string, password: string): Promise<Login | Error> {
    try {
      if (!email || !password) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide email and password',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'User does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Plase enter correct password or email',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = jwt.sign(
        {
          payload: {
            user: user.id,
            role: user.role,
          },
        },
        this.configService.get<string>('JWT_SECRET_KEY'),
        {
          expiresIn: '1day',
        },
      );

      const response = {
        message: 'Login successful',
        token: `Bearer ${token}`,
      };

      return response;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
