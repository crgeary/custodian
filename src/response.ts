import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export class ResponseObject {
    public isBase64Encoded;
    public statusCode;
    public body;
    public headers;
    public cookies;
    constructor({
        isBase64Encoded = false,
        statusCode,
        body,
        headers = {},
        cookies = [],
    }: APIGatewayProxyStructuredResultV2) {
        this.isBase64Encoded = isBase64Encoded;
        this.statusCode = statusCode;
        this.body = body;
        this.headers = headers;
        this.cookies = cookies;
    }
    send(): APIGatewayProxyStructuredResultV2 {
        return Object.assign({}, this);
    }
    setHeader(name: string, value: string): void {
        this.headers[name] = value;
    }
    removeHeader(name: string): boolean {
        return delete this.headers[name];
    }
    getHeader(name: string): undefined | string | number | boolean {
        return this.hasHeader(name) ? this.headers[name] : undefined;
    }
    hasHeader(name: string): boolean {
        return name in this.headers;
    }
    getHeaders(): { [name: string]: boolean | number | string } {
        return this.headers;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const response = (statusCode = 200, body: any = '', otherProperties = {}): ResponseObject => {
    return new ResponseObject({
        ...otherProperties,
        statusCode,
        body,
    });
};
