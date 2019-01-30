/**
 * Created by huangyi
 */
'use strict';
const moment = require('moment');
import valid from '../utils/validator';
import goodsModel from '../model/goods';
import Number from '../utils/number'

async function selectGoods(ctx) {
    let param = ctx.request.body;
    let list = await goodsModel.selectGoods(param.page,param.size);
    ctx.body = {data: list, result: true, code: 200}
}

async function detail(ctx) {
    let param = valid(ctx.request.query, {
        id: {type: 'number', empty: true},
    })
    let res = await goodsModel.detail(param.id);
    ctx.body = {data: res, result: true, code: 200}
}

export default {
    selectGoods,
    detail
};
