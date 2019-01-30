const options = require('../model-opts');

module.exports = function(Sequelize, DataTypes) {
    const shopCart = Sequelize.define('shopCart', {
        id: {
            type: DataTypes.INTEGER(8),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
        },
        goodsId: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
            field:"goods_id"
        },
        amount:{
            type:DataTypes.INTEGER(8),
            allowNull: false,
        }
    }, Object.assign(options, {tableName: 'shop_cart'}));
    shopCart.associate = ({user,goods}) => {
        shopCart.belongsTo(goods, {as: 'goods', foreignKey: 'goodsId'});
        shopCart.belongsTo(user,{as: 'user', foreignKey: 'uid'})
    };
    return shopCart;
};
