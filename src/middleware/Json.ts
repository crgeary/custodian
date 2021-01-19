import { ResponseObject } from '../response';

export default (res: ResponseObject): void => {
    res.headers = { ...res.headers, 'Content-Type': 'application/json' };
    res.body = typeof res.body !== 'string' ? JSON.stringify(res.body) : '';
};
