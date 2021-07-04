const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const  login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'User are incorect' })

        if(!user.status) return res.status(400).json({msg: 'User not exist' })

        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword) return res.status(400).json({msg: 'Password are incorect' })
       
        const token = await generateJWT( user.id )

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'We have a problem'
            //error
        })
    }

}


module.exports = {
    login
}