import {Router} from 'express';
import userController from '../controllers/user.controller.mjs'


const router = Router()

router.get('/', (req, res) => { 
  res.json({
    status: 'API Works', 
    message: 'Welcome to FirstRest API v1' 
  }); 
});

router.route('/user')
  .post(userController.create)
  .get(userController.get);

router.route('/login')
  .post(userController.login)
  
export default router;