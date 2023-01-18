import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassComments, EnrollUser, Error } from './usersenroll.interface';

@Injectable()
export class UsersenrollService {
  constructor(private prisma: PrismaService) {}

  async enrollUser(
    userId: string,
    classId: string,
    termin: number,
  ): Promise<EnrollUser | Error> {
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

      if (!classId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide classId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const userFound = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          enrolled: true,
        },
      });

      if (!userFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'User does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const classFound = await this.prisma.class.findUnique({
        where: {
          id: classId,
        },
        include: {
          enrolled: true,
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

      if (classFound.enrolled.length == 10) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Class enrollment has exceeded limit',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (userFound.enrolled.length == 2) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'User enrollment has exceeded limit',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (userFound.category !== classFound.category) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'User category is not the same as class category',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (
        !(
          termin >= Number(classFound.termin.split('-')[0]) &&
          termin <= Number(classFound.termin.split('-')[1])
        )
      ) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please provide hour termin that is inside class termin, if morning termin, provide number between 5 and 9, if afternoon termin provide number between 16 and 21',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdEnrollment = await this.prisma.enrolled.create({
        data: { enrolled: true, userId: userId, classId: classId },
      });

      return createdEnrollment;
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

  async commentUser(enrolledId: string, comment: string, rating: number) {
    try {
      if (!enrolledId || !comment || !rating) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide enrolledId, comment and rating',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (rating > 5) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Rating should be less or equal to 5',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const findEnrolled = await this.prisma.enrolled.findUnique({
        where: {
          id: enrolledId,
        },
        include: {
          Class: true,
        },
      });

      if (!findEnrolled) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Enrollment does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const createdComment = await this.prisma.commentRating.create({
        data: {
          comment: comment,
          rating: rating,
          classId: findEnrolled.classId,
        },
      });

      const allRatings = await this.prisma.commentRating.findMany();

      let sumRating: number = 0;
      let averageRating: number;

      for (let i = 0; i < allRatings.length; i++) {
        sumRating += allRatings[i].rating;
      }
      averageRating = sumRating / allRatings.length;

      const response = { createdComment, averageRating };

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

  async unrollUser(enrolledId: string): Promise<String | Error> {
    try {
      if (!enrolledId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Please provide enrolledId',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const enrollmentFound = await this.prisma.enrolled.findUnique({
        where: {
          id: enrolledId,
        },
      });

      if (!enrollmentFound) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Enrollment does not exist',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const unrolledUser = await this.prisma.enrolled.delete({
        where: {
          id: enrolledId,
        },
      });

      return 'User unrolled';
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

  async getClassComments(classId: string): Promise<ClassComments[] | Error> {
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
        include: {
          commentRating: true,
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

      const getClassComments = classFound.commentRating;

      return getClassComments;
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
