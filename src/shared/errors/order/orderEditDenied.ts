import { DeniedError } from '../deniedError';

export class OrderEditDenied extends DeniedError {
  constructor() {
    super('Order must be pending');
  }
}
