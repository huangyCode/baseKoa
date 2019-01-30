module.exports = {
    test: {
        username: 'root',
        password: '123456',
        database: 'graph',
        port: '3306',
        host: '0.0.0.0',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        seederStorage: 'sequelize'
    },
    production: {
        username: '',
        password: '',
        database: '',
        port: '3306',
        host: '47.110.251.77',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        seederStorage: 'sequelize'
    }
}[process.env.NODE_ENV || 'test'];
