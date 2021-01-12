const custodian = (cb: Function): Function => {
    return async (event: object, context: object, callback: Function) => {
        try {
            const res = await cb(event, context, callback);
            return {
                isBase64Encoded: false,
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(res),
            };
        } catch (err) {
            console.error(err);
            return {
                isBase64Encoded: false,
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(err),
            };
        }
    };
};

export default custodian;
