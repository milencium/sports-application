import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Error, User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userId: string, username: string): Promise<User | Error> {
    try {
      if (!userId || !username) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Plase provide userId and username',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
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

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: { username: username },
      });

      return updatedUser;
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

  async getUser(userId: string): Promise<User | Error> {
    try {
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Plase provide userId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
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

      return user;
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

  async getAllUsers(): Promise<User[] | Error> {
    try {
      const users = await this.prisma.user.findMany();

      return users;
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

  async deleteUser(userId: string): Promise<String | Error> {
    try {
      if (!userId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide userId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
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

      const deleteUser = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return 'User deleted';
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
