import router from 'koa-router';
import user from '../controllers/user';

export default router()
    .get('/list', user.selectUser)
    .get('/detail', user.detail)