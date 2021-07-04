

const haveRole = ( ...roles ) =>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(500).json({
            msg: 'Not valid token'  
            })
        }
        if(!roles.includes( req.user.role )){
            return res.status(401).json({
                msg: 'You don\'t have enough permissions '
            })
        }
        next()
    }
}

 

module.exports = {
    haveRole
}