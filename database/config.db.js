const mongoose = require('mongoose')

const dbConnection = async() =>{

    try{
        await mongoose.connect( process.env.MONGODB_ATLAS,
            {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify : false
            }
        );
        console.log('DB ready')
    } catch (error) {
        throw new Error( 'Error: ', error)
    }

}


module.exports ={
    dbConnection
}