import Router from 'express';
import fetchUser from './fetchUser';

const router = Router();

router.get('/', fetchUser);

export default router;
