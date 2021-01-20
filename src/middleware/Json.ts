import { ResponseObject } from '../response';

const isJson = (str: string): boolean => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export default (res: ResponseObject): void => {
    res.setHeader('Content-Type', 'application/json');
    if (typeof res.body !== 'string' || !isJson(res.body)) {
        res.body = JSON.stringify(res.body);
    }
};
