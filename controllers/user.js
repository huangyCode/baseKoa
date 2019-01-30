/**
 * Created by huangyi
 */
'use strict';
const moment = require('moment');
import valid from '../utils/validator';
import userModel from '../model/user';
import Number from '../utils/number'

async function selectUser(ctx) {
    let list = await userModel.selectUser();
    ctx.body = {data: list, result: true, code: 200}
}

async function detail(ctx) {
    let param = valid(ctx.request.query, {
        uid: {type: 'number', empty: true},
    });
    let list = await userModel.detail(param.uid);
    ctx.body = {data: list, result: true, code: 200}
}

export default {
    selectUser,
    detail
};
