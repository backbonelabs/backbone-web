import Router from 'express';
import businessEmail from './businessEmail';
import mailingList from './mailingList';
import contactEmail from './contactEmail';

const router = Router();

router.post('/contact', contactEmail);
router.post('/business', businessEmail);
router.post('/mailing-list', mailingList);

export default router;
