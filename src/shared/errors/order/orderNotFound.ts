import { NotFoundError } from '../notFoundError';

export class OrderNotFoundError extends NotFoundError {
  constructor() {
    super('No order found');
  }
}
