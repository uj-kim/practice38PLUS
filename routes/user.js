// TODO: 라우트 설정
const express = require('express');
const controller = require('../controller/Cuser');
const router = express.Router();

//기본주소 : localhost:PORT


// GET / => localhost:PORT/user
router.get('/', controller.main);


// GET /user/signin => localhost:PORT/user/signin
router.get('/signin', controller.getSignin);

// POST /user/signin
router.post('/signin', controller.postSignin);


// GET /user/signup => localhost:PORT/user/signup
router.get('/signup', controller.getSignup);

// pOST /user/signup
router.post('/signup', controller.postSignup);

// POST /user/profile
router.post('/profile', controller.postProfile);

// POST /user/profile/edit
router.post('/profile/edit', controller.postEdit);

//POST /user/profile/delete
router.post('/profile/delete', controller.postDelete);

module.exports = router;