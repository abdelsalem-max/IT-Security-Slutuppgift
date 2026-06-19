module.exports = {
    env: 'production',
    httpPort: 8080,
    httpsPort: 8443,
    corsOrigins: [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    jwt: {
        secret: 'BYT_DENNA_HEMLIGHET_I_PRODUKTIONSKONFIGURATIONEN',
        expiresIn: '1h'
    },
    https: {
        enabled: true,
        keyPath: 'certs/selfsigned.key',
        certPath: 'certs/selfsigned.crt'
    }
};
