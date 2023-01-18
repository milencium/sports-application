import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Class, Error, Sport } from './sports.interface';

@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) {}

  async createSport(name: string): Promise<Sport | Error> {
    try {
      if (!name) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide sport name',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const sportFound = await this.prisma.sports.findUnique({
        where: {
          name: name,
        },
      });

      if (sportFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Sport already exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const createdSport = await this.prisma.sports.create({
        data: {
          name: name,
        },
      });

      return createdSport;
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

  async updateSport(sportId: string, name: string): Promise<Sport | Error> {
    try {
      if (!sportId || !name) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide sportId and name',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const sportFound = await this.prisma.sports.findUnique({
        where: {
          id: sportId,
        },
      });

      if (!sportFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Sport does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const updatedSport = await this.prisma.sports.update({
        where: {
          id: sportId,
        },
        data: {
          name: name,
        },
      });

      return updatedSport;
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

  async getAllSports(): Promise<Sport[] | Error> {
    try {
      const sports = await this.prisma.sports.findMany();

      return sports;
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

  async getSport(sportId: string): Promise<Sport | Error> {
    try {
      if (!sportId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide sportId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const sportFound = await this.prisma.sports.findUnique({
        where: {
          id: sportId,
        },
      });

      if (!sportFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Sport does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return sportFound;
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

  async deleteSport(sportId: string): Promise<String | Error> {
    try {
      if (!sportId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide sportId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const sportFound = await this.prisma.sports.findUnique({
        where: {
          id: sportId,
        },
      });

      if (!sportFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Sport does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const deletedSport = await this.prisma.sports.delete({
        where: {
          id: sportId,
        },
      });

      return 'Sport deleted';
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

  async getSportsClasses(
    sport: string,
    category: string,
  ): Promise<Class[] | Error> {
    try {
      if (!sport || !category) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide sport and category',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const sportsClasses = await this.prisma.class.findMany({
        where: {
          sportsName: sport,
          category: category,
        },
      });
      return sportsClasses;
    } catch (error: any) {
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
