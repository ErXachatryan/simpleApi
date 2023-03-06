import { ServiceError } from './serviceError';

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message, 'Not Found Error');
  }
}
