export class ApplicationError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class HttpError extends ApplicationError {
  constructor(public status: number, message?: string) {
    super(message)
  }
}

export class NotAuthorizedError extends HttpError {
  constructor(message?: string) {
    super(401, message)
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(500, message)
  }
}
