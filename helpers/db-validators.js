const Role = require('../models/role');
const User = require('../models/user');

const validateRoll = async( role = '') =>{
    const existRole = await Role.findOne({role});
    if (!existRole) throw new Error(`The role ${role} is not in database` )
} 

const existEmail = async( email = '') => {
    const emailInDB = await User.findOne( {email} )
    if(emailInDB) throw new Error(`${ email } already exist`)
}

const existUserById = async( id = '') => {
    const userlInDB = await User.findById( id )
    if(!userlInDB) throw new Error(`${ id } not exist in DB`)
}

module.exports = {
    validateRoll,
    existEmail,
    existUserById

}