import Router from 'express';
import login from './login';
import signup from './signup';
import requestReset from './requestReset';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/request-reset', requestReset);

export default router;
