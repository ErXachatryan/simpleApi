import { NotFoundError } from '../notFoundError';

export class ItemNotFoundError extends NotFoundError {
  constructor() {
    super('No item found');
  }
}
