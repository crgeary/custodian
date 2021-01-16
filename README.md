# Custodian

A library for building APIs with AWS Lambda & API Gateway.

## Install

```
npm i @crgeary/custodian
```

## Todo

-   [x] Generic Responses
-   [x] Error Handler
-   [ ] Middleware
-   [ ] Tests

## Usage

### Basic Example

Input:

```js
import { custodian } from '@crgeary/custodian';

export const handler = custodian(() => {
    return {
        message: 'Hello, World!',
    };
});
```

Output:

```js
{
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{ "message": "Hello, World!" }',
    cookies: [],
}
```

### Custom Status Codes

Input:

```js
import { custodian, response } from '@crgeary/custodian';

export const handler = custodian(() => {
    return response(202, {
        message: 'The resource has been scheduled for processing.',
    });
});
```

Output:

```js
{
    isBase64Encoded: false,
    statusCode: 202,
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{ "message": "The resource has been scheduled for processing." }',
    cookies: [],
}
```

### Errors

Input:

```js
import { custodian, NotFoundError } from '@crgeary/custodian';

export const handler = custodian(() => {
    throw new NotFoundError('The resource could not be found.');
    return {
        message: 'Hello, World!',
    };
});
```

Output:

```js
{
    isBase64Encoded: false,
    statusCode: 404,
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{ "message": "The resource could not be found." }',
    cookies: [],
}
```

## License

Licensed under the [MIT License](./LICENSE).
