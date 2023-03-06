import { DeniedError } from '../deniedError';

export class TransactionDeniedError extends DeniedError {
  constructor() {
    super('Database transaction denied');
  }
}
