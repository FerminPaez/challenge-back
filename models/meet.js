const { Schema, model } = require('mongoose');

const MeetSchema = Schema({
    title: {
        type: String,
        require: [true, "The title can not be empty"]
    },
    description: {
        type: String,
        require: [true, "The description can not be empty"]
    },
    beer_box: {
        type: Number,
        require: [true, "The number of boxes can not be empty"]
    },
    guests:{
        type: Array,
        default: []
    },
    temperature: {
        type: Number,
        require: [true, "Temperature can not be empty" ]
    },
    location:{
        type: String,
        require: [true, "Location can not be empty"]
    },
    date: {
        type: Date,
        require: [true, "The date can not be empty"]
    },
    attendance: {
        type: Array,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    }

});

MeetSchema.methods.toJSON = function() {
    const { __v, _id, ...meet } = this.toObject();
    meet.uid = _id
    return meet
}

module.exports = model('Meet', MeetSchema);