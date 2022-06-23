const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            autoIndex: false,
            retryWrites: false
        },
        url: `${process.env.DB_URL}`
    },
    server: {
        url: 'localhost',
        port: 8081
    }
};

export default config;
