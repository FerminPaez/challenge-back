const jwt = require('jsonwebtoken')


const generateJWT = async( uid = '' )=>{
    return new Promise( (resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '12h'
        },(err, token)=>{
            err ? reject('err') : resolve(token) 
        })
    } )

}


module.exports = {
    generateJWT
}