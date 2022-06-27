import express from 'express';
import controller from '../controllers/user'
import extractFireBaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.get('/validate', extractFireBaseInfo, controller.validate);
router.get('/:userID', controller.read);
router.post('/create', extractFireBaseInfo, controller.create);
router.post('/login', extractFireBaseInfo, controller.login);
router.get('/', controller.readAll);

export = router;