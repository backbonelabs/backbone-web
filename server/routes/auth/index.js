import Router from 'express';
import login from './login';
import signup from './signup';
import requestReset from './requestReset';
import passwordReset from './passwordReset';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/request-reset', requestReset);
router.post('/password-reset', passwordReset);

export default router;
