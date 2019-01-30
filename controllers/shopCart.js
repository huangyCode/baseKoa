/**
 * Created by huangyi
 */
'use strict';
const moment = require('moment');
import valid from '../utils/validator';
import shopCartModel from '../model/shopCart';
import Number from '../utils/number'

async function selectCart(ctx) {
    let param = valid(ctx.request.query, {
        uid: {type: 'number', empty: false},
    });
    let shopCart = await shopCartModel.selectShopCart(param.uid);
    let list = [];
    for (let item of shopCart) {
        item = item.dataValues;
        let obj = {};
        obj = Object.assign(obj, item.goods.dataValues);
        obj.id = item.id;
        obj.amount = item.amount;
        obj.uid = item.uid;
        list.push(obj);
    }
    ctx.body = {data: list, result: true, code: 200}
}

export default {
    selectCart,
};
