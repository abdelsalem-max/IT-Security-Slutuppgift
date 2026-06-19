module.exports = {
    env: 'development',
    httpPort: 8080,
    httpsPort: 8443,
    corsOrigins: [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    jwt: {
        secret: 'MY_LONG_AND_SECRET_TOKEN_AT_LEAST_192BIT_LONG_TO_BE_SAFE!',
        expiresIn: '1h'
    },
    https: {
        enabled: true,
        keyPath: 'certs/selfsigned.key',
        certPath: 'certs/selfsigned.crt'
    }
};
