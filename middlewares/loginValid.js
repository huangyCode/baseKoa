/**
 * app登录验证
 *
 * Created by runner on 17/5/19.
 */

const unLogObj = {code: code.AUTH_FAIL, message: msg.AUTH_FAIL, result: false};

export default async (ctx, next) => {
    let authkey = ctx.headers['authkey'];

    if(authkey && authkey.length > 0) {
        let mid = await client.get(`app_login_token_${authkey}`);

        mid ? ctx.state.mid = mid && await next() : ctx.body = unLogObj
    }else {
        ctx.body = unLogObj
    }
};