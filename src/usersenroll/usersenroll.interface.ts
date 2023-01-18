export interface EnrollUser {
  id: string;
  enrolled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentUser {
  id: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  classId: string;
}

export interface ClassComments {
  id: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  classId: string;
}

export interface Comment extends CommentUser {
  createdComment: CommentUser;
  averageRating: number;
}

export interface ResponseBody {
  status: number;
  errors: string;
}

export interface ErrorBody extends ResponseBody {
  response: ResponseBody;
  status: number;
  message: string;
  name: string;
}

export interface Error extends ErrorBody {
  status: number;
  error: ErrorBody;
}
