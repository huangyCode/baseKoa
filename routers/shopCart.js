import router from 'koa-router';
import shopCart from '../controllers/shopCart';

export default router()
    .get('/list',shopCart.selectCart)