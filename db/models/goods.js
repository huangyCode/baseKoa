const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const goods = Sequelize.define('goods', {
        id: {
            type: DataTypes.INTEGER(8),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        goodsName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'goods_name'
        },
        price: {
            type: DataTypes.DECIMAL(5),
            allowNull: false,
        },
        color:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        size:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        goodsDesc:{
            type: DataTypes.STRING(50),
            allowNull: false,
            field:'goods_desc'
        },
        goodsType:{
            type: DataTypes.STRING(20),
            allowNull: false,
            field:'goods_type'
        },
        storeNum: {
            type: DataTypes.STRING(5),
            allowNull: false,
            field:'store_num'
        },
    }, Object.assign(options, {tableName: 'goods'}));
    return goods;
};
