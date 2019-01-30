import logUtil from '../utils/logConfig';

export default async (ctx, next) => {
    const st = new Date();
    try {
        await next();
        logUtil.logResponse(ctx, new Date() - st);
    } catch (err) {
        ctx.body = {
            code: -2,
            description: '系统异常',
            result: false
        };
        logUtil.logError(ctx, err, new Date() - st);
    }
};