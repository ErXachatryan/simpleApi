import { ServiceError } from './serviceError';

export class DeniedError extends ServiceError {
  constructor(message: string) {
    super(message, 'Denied Error');
  }
}
