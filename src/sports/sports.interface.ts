export interface Sport {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: string;
  name: string;
  category: string;
  description: string;
  termin: string;
  createdAt: Date;
  updatedAt: Date;
  sportsName: string | null;
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
