# Custodian

A library for building AWS Lambda APIs.

## Install

```
npm i @crgeary/custodian
```

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

## License

Licensed under the [MIT License](./LICENSE).
