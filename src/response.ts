import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export class ResponseObject implements ResponseInterface {
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
}

export interface ResponseInterface extends APIGatewayProxyStructuredResultV2 {
    send(): APIGatewayProxyStructuredResultV2;
}

export const response = (statusCode = 200, body: any = '', otherProperties = {}): ResponseInterface => {
    return new ResponseObject({
        ...otherProperties,
        statusCode,
        body,
    });
};
