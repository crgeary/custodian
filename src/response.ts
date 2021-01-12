import { APIGatewayProxyResultV2 } from 'aws-lambda';

export const response = (statusCode = 200, body: any = '', headers = {}): APIGatewayProxyResultV2 => ({
    isBase64Encoded: false,
    statusCode,
    headers: {
        'Content-Type': 'application/json',
        ...headers,
    },
    body: body !== '' && body !== null ? JSON.stringify(body) : '',
});
