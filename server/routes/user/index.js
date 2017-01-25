import Router from 'express';
import fetchUser from './fetchUser';
import updateUser from './updateUser';

const router = Router();

router.get('/', fetchUser);
router.post('/', updateUser);

export default router;
