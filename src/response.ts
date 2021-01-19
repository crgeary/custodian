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
}

export const response = (statusCode = 200, body: any = '', otherProperties = {}): ResponseObject => {
    return new ResponseObject({
        ...otherProperties,
        statusCode,
        body,
    });
};
