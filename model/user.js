const {user} = require('../db');

class shopCartModel {
    selectUser() {
        return user.findAll()
    }
    detail(id){
        return user.findOne({where:{id}})
    }
}

module.exports = new shopCartModel();