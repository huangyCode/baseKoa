import router from 'koa-router';
import goods from '../controllers/goods';

export default router()
    .post('/list',goods.selectGoods)
    .get('/detail',goods.detail)