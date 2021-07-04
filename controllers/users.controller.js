const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const getUser = async(req = request, res = response) => { 
    //Ver mas adelante como mas eficiente la parte del buscador
    const { limit =100 , from = 0 } = req.query;
    const where = {status: true}

    const [ total, users ] = await Promise.all([
        User.countDocuments(where),
        User.find(where)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const putUser = async(req, res = response) => {
    const { id  } = req.params;
    const {_id, password, email, ...rest } = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password ,salt)
    }

    const user = await User.findByIdAndUpdate( id, rest );


    res.json({
        id,
        user
    })
}

const postUser =  async(req, res) =>  {

    const { name, email, password, role } = req.body;
    const user = new User(
        {
            name,
            email,
            password,
            role
        }
    )

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()


    res.json({
        user
    })
}

const deleteUser =  async(req, res) =>{  
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json({
        user
    })
}



module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}