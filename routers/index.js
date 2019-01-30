/**
 * Created by nova on 2017/5/18.
 */
import router from 'koa-router';
import user from './user'
import shopCart from './shopCart'
import goods from './goods'

export default router()
    .use('/shopCart', shopCart.routes(), shopCart.allowedMethods())
    .use('/user', user.routes(), user.allowedMethods())
    .use('/goods', goods.routes(), goods.allowedMethods())