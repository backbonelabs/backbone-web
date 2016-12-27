import Router from 'express';
import login from './login';
import signup from './signup';
import isAuthenticated from './isAuthenticated';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/me', isAuthenticated);

export default router;
