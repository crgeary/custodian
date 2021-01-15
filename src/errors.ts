export class BaseError extends Error {
    public statusCode: number;
    public isCustodianError = true;
    constructor(statusCode: number, name: string, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(400, 'BadRequestError', message);
    }
}
export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(401, 'UnauthorizedError', message);
    }
}
export class ForbiddenError extends BaseError {
    constructor(message: string) {
        super(403, 'ForbiddenError', message);
    }
}
export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(404, 'NotFoundError', message);
    }
}
export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(500, 'InternalServerError', message);
    }
}
