const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller'); 
const { validateInputs } = require('../middlewares/validateInputs');

const router = Router();

router.post('/login',[
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password is requied').not().isEmpty(),
    validateInputs
],
 login );


module.exports = router