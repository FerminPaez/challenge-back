const  validateInputs = require('../middlewares/validateInputs');
const  validateJWT    = require('../middlewares/validateJWT');
const  haveRole       = require('../middlewares/validateRoles');

module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...haveRole
}