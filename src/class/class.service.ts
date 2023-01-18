import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Class, Error } from './class.interface';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async createClass(
    name: string,
    category: string,
    description: string,
    termin: string,
    sportsName: string,
  ): Promise<Class | Error> {
    try {
      if (!name || !category || !description || !termin) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please provide class data: name, category, description, termin',
          },
          HttpStatus.BAD_GATEWAY,
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
              'Please provide proper class category: children, youth, youngAdults or adults',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (termin !== '5-9' && termin !== '16-21') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please provide proper class termin: "5-9" (morning termin) or "16-21" (afternoon termin)',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const sportFound = await this.prisma.sports.findUnique({
        where: {
          name: sportsName,
        },
      });

      if (!sportFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Please provide name of the sport that exist ',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const classFound = await this.prisma.class.findUnique({
        where: {
          name: name,
        },
      });

      if (classFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Class already exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const createdClass = await this.prisma.class.create({
        data: {
          name: name,
          category: category,
          description: description,
          termin: termin,
          sportsName: sportsName,
        },
      });

      return createdClass;
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

  async updateClass(
    classId: string,
    name: string,
    category: string,
    description: string,
    termin: string,
  ): Promise<Class | Error> {
    try {
      if (!classId || !name || !category || !description || !termin) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please provide class data: classId, name, category, description and termiin',
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
              'Please provide proper class category: children, youth, youngAdults or adults',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (termin !== '5-9' && termin !== '16-21') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please provide proper class termin: "5-9"(morning termin) or "16-21"(afternoon termin)',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const classFound = await this.prisma.class.findUnique({
        where: {
          id: classId,
        },
      });

      if (!classFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Class does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const classNameFound = await this.prisma.class.findUnique({
        where: {
          name: name,
        },
      });

      if (classNameFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Class with that name is already in use',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updatedClass = await this.prisma.class.update({
        where: {
          id: classId,
        },
        data: {
          name: name,
          category: category,
          description: description,
          termin: termin,
        },
      });

      return updatedClass;
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

  async getAllClasses(): Promise<Class[] | Error> {
    try {
      const classes = await this.prisma.class.findMany();

      return classes;
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

  async getClass(classId: string): Promise<Class | Error> {
    try {
      if (!classId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide classId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const classFound = await this.prisma.class.findUnique({
        where: {
          id: classId,
        },
      });

      if (!classFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Class does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return classFound;
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

  async deleteClass(classId: string): Promise<String | Error> {
    try {
      if (!classId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide classId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const classFound = await this.prisma.class.findUnique({
        where: {
          id: classId,
        },
      });

      if (!classFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Class does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const deletedClass = await this.prisma.class.delete({
        where: {
          id: classId,
        },
      });

      return 'Class deleted';
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
