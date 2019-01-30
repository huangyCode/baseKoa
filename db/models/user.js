const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const user = Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(8),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        sex: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER(5),
            allowNull: false,
        },
        nickName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'nick_name'
        },
    }, Object.assign(options, {tableName: 'user'}));
    return user;
};
