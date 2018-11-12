import ExtendableError from 'es6-error';

export class UnauthorizedError extends ExtendableError {}

export class ForbiddenError extends ExtendableError {}

export class NotFoundError extends ExtendableError {}

export class UnexpectedResponseError extends ExtendableError {
  constructor(message, statusCode, response) {
    super(message);
    this.statusCode = statusCode || 0;
    this.response = response || {};
  }
}

export class ServerError extends UnexpectedResponseError {}

export class RequestError extends ExtendableError {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 0;
  }
}


export default {
  UnauthorizedError,
  ForbiddenError,
  UnexpectedResponseError,
  NotFoundError,
  ServerError,
  RequestError,
};
