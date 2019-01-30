const {shopCart,user,goods} = require('../db');

class shopCartModel {
    selectShopCart(uid) {
        return shopCart.findAll({
            include: [
                {
                    model: goods,
                    as: 'goods',
                    required: true,
                }
            ],
            where: {
                uid
            }
        })
    }
}

module.exports = new shopCartModel();