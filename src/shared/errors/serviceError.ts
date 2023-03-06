export class ServiceError extends Error {
  constructor(message: string, name: string) {
    super(message);

    this.name = name;
  }
}
