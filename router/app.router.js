const express=require('express');

const router=express.Router();
const appController=require('../controller/app.controller')
router.get('/',appController.home);
router.get('/getRegister',appController.getRegister);
router.post('/register',appController.register);
router.post('/login',appController.login);
router.get('/dashboard',appController.Auth,appController.dashboard);
router.get('/logout',appController.logout)
module.exports=router;