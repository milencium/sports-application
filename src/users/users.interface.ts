export interface User {
  id: string;
  email: string;
  username: string;
  category: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
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
