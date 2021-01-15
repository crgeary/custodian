import {
    APIGatewayProxyHandlerV2,
    APIGatewayProxyEventV2,
    Context,
    Callback,
    APIGatewayProxyResultV2,
} from 'aws-lambda';

import { response, ResponseInterface, ResponseObject } from './response';
import {
    BaseError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
} from './errors';

interface CustodianAPIGatewayProxyCallback {
    (event: APIGatewayProxyEventV2, context: Context, callback: Callback):
        | Promise<ResponseInterface>
        | Record<string, any>;
}

const custodian = (cb: CustodianAPIGatewayProxyCallback): APIGatewayProxyHandlerV2 => {
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
            return r.send();
        } catch (err) {
            let statusCode = 500;
            if (err.isCustodianError) {
                statusCode = err.statusCode;
            }
            return response(statusCode, { message: err.message }).send();
        }
    };
};

export default custodian;
export {
    response,
    ResponseObject,
    BaseError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
};
