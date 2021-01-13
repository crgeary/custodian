import {
    APIGatewayProxyHandlerV2,
    APIGatewayProxyEventV2,
    Context,
    Callback,
    APIGatewayProxyResultV2,
} from 'aws-lambda';

import { response } from './response';

interface CustodianAPIGatewayProxyCallback {
    (event: APIGatewayProxyEventV2, context: Context, callback: Callback):
        | Promise<APIGatewayProxyResultV2>
        | Record<string, any>;
}

const custodian = (cb: CustodianAPIGatewayProxyCallback): APIGatewayProxyHandlerV2 => {
    return async (
        event: APIGatewayProxyEventV2,
        context: Context,
        callback: Callback
    ): Promise<APIGatewayProxyResultV2> => {
        try {
            return response(200, await cb(event, context, callback));
        } catch (err) {
            return response(500, {
                message: err.message,
            });
        }
    };
};

export default custodian;
