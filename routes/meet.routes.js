const { Router } = require('express');
const { check } = require('express-validator');
const {getMeet, putMeetGuests, putMeetAttendance, postMeet, deleteMeet} = require('../controllers/meet.controller')
const { existUserById } = require('../helpers/db-validators');

const { validateInputs, validateJWT, haveRole } = require('../middlewares')

const router = Router();

router.get('/',[
    validateJWT
], getMeet );

router.put('/:id',[
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existUserById ),
    validateInputs
], putMeetGuests);

router.put('/:id',[
    validateJWT,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existUserById ),
    validateInputs
], putMeetAttendance);

router.post('/',[
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('beer_box', 'Beer_box is required').not().isEmpty(),
    check('temperature', 'Temperature is required').not().isEmpty(),
    validateInputs
], postMeet);

router.delete('/:id',[
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existUserById ),
    validateInputs
], deleteMeet);




module.exports = router