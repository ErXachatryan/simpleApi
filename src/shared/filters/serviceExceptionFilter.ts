import {
  ArgumentsHost,
  Catch,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { NotFoundError } from '../errors/notFoundError';
import { DeniedError } from '../errors/deniedError';
import { ServiceError } from '../errors/serviceError';
import { TransactionDeniedError } from '../errors/database/transactionDenied';

@Catch()
export class ServiceExceptionFilter extends BaseExceptionFilter {
  catch(exception: ServiceError, host: ArgumentsHost) {
    if (exception instanceof NotFoundError)
      return super.catch(new NotFoundException(exception.message), host);

    if (exception instanceof TransactionDeniedError)
      return super.catch(
        new InternalServerErrorException(exception.message),
        host,
      );

    if (exception instanceof DeniedError)
      return super.catch(
        new PreconditionFailedException(exception.message),
        host,
      );

    return super.catch(exception, host);
  }
}
