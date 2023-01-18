export interface Register {
  message: string;
}

export interface Login {
  message: string;
  token: string;
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
