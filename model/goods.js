const {goods} = require('../db');

class goodsModel {
    selectGoods(page,size) {
        if (page && size){
            return goods.findAll({
                offset: (page - 1) * size,
                limit: size
            })
        } else {
            return goods.findAll()
        }
    }

    detail(id) {
        return goods.findOne({where: {id}})
    }
}

module.exports = new goodsModel();