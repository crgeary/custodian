import {
    APIGatewayProxyHandlerV2,
    APIGatewayProxyEventV2,
    Context,
    Callback,
    APIGatewayProxyResultV2,
} from 'aws-lambda';

import { response, ResponseObject } from './response';
import { runMiddleware, CustodianMiddleware, defaultMiddleware } from './middleware';
import {
    BaseError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
} from './errors';

interface CustodianOptions {
    middleware?: Array<CustodianMiddleware>;
}

interface CustodianAPIGatewayProxyCallback {
    (event: APIGatewayProxyEventV2, context: Context, callback: Callback):
        | Promise<ResponseObject>
        | Record<string, any>;
}

const custodian = (cb: CustodianAPIGatewayProxyCallback, options: CustodianOptions = {}): APIGatewayProxyHandlerV2 => {
    return async (
        event: APIGatewayProxyEventV2,
        context: Context,
        callback: Callback
    ): Promise<APIGatewayProxyResultV2> => {
        try {
            let r = await cb(event, context, callback);
            if (!(r instanceof ResponseObject)) {
                r = response(200, r);
            }
            return (await runMiddleware(r as ResponseObject, options?.middleware || defaultMiddleware)).send();
        } catch (err) {
            let statusCode = 500;
            if (err.isCustodianError) {
                statusCode = err.statusCode;
            }
            return (
                await runMiddleware(
                    response(statusCode, { message: err.message }),
                    options?.middleware || defaultMiddleware
                )
            ).send();
        }
    };
};

export {
    custodian,
    response,
    defaultMiddleware,
    ResponseObject,
    BaseError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
};
