/** source/routes/posts.ts */
import express from 'express';
import userController from '../controllers/users';
import adController from '../controllers/ad';
import stateController from '../controllers/states';
import categorieController from '../controllers/categories';

const router = express.Router();

router.post('/user/login', userController.login);
router.post('/user/signup', userController.signup);
router.get('/user/me', userController.getUSer);
router.put('/user/me', userController.updateUser);

router.get('/ad/list', adController.getAd);
router.get('/ad/item', adController.getAd);

router.get('/states', stateController.getStates);

router.get('/categories', categorieController.getCategories);

export = router;