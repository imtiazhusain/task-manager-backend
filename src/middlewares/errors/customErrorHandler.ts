import createHttpError from "http-errors";

class CustomErrorHandler extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message: string) {
    return createHttpError(409, message);
  }

  static wrongCredentials(message: string = "Invalid email or password") {
    return createHttpError(401, message);
  }

  static unAuthorized(message: string = "Unauthorized") {
    return createHttpError(403, message);
  }

  static notFound(message: string = "404 not found") {
    return createHttpError(404, message);
  }

  static invalidId(message: string) {
    return createHttpError(422, message);
  }
  static serverError() {
    return createHttpError(500, "Internal server error");
  }
}

export default CustomErrorHandler;
