import { ResponseObject } from './response';
import Json from './middleware/Json';

export const defaultMiddleware: Array<CustodianMiddleware> = [Json];

export interface CustodianMiddleware {
    (res: ResponseObject): void;
}

export const runMiddleware = async (
    res: ResponseObject,
    middleware: Array<CustodianMiddleware>
): Promise<ResponseObject> => {
    for (let i = 0; i < middleware.length; i++) {
        await middleware[i](res);
    }
    return res;
};
