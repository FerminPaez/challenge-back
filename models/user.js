const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        require: [true, "The name is required"],
    },
    email: {
        type: String,
        require: [true, "The email is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "The password is required"]
    },
    role: {
        type: String,
        require: [true, "The password is required"],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    }

});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user
}



module.exports = model('User', UserSchema);