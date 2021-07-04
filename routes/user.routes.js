const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, putUser, postUser, deleteUser } = require('../controllers/users.controller');
const { validateRoll, existEmail, existUserById } = require('../helpers/db-validators');

const { validateInputs, validateJWT, haveRole } = require('../middlewares')

const router = Router();

router.get('/', getUser );

router.put('/:id',[
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( validateRoll ),
    validateInputs
], putUser);

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').isLength({min : 7}),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( validateRoll ),
    validateInputs
], postUser);

router.delete('/:id',[
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existUserById ),
    validateInputs
], deleteUser);




module.exports = router