const { request, response } = require('express');

const Meet = require('../models/meet');
const { socketController } = require('../sockets/socket.controller');
const getMeet = async(req = request, res = response) => { 

    const { limit = 5, from = 0 } = req.query;
    const where = {status: true}

    const [ total, meet ] = await Promise.all([
        Meet.countDocuments(where),
        Meet.find(where)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        meet
    })
}

const putMeetGuests = async(req, res = response) => {
    //Use this function for update the guest
    const { id  } = req.params;
    const {_id,  ...rest } = req.body;

    const meet = await Meet.findByIdAndUpdate( id, rest );

    res.json({
        id,
        meet
    })
}

const putMeetAttendance = async(req, res = response) => {
    //Use this function for update the attendance
    
    const { id  } = req.params;
    const {_id,  ...rest } = req.body;

    const meet = await Meet.findByIdAndUpdate( id, rest );

    res.json({
        id,
        meet
    })
}

const postMeet =  async(req, res) =>  {

    const { title, description, beer_box, guests, temperature, location, date, attendance, status } = req.body;
    const meet = new Meet(
        {
            title,
            description,
            beer_box,
            guests,
            temperature,
            location,
            date,
            attendance,
            status
        }
    )

    await meet.save()
    
    res.json({
        meet
    })
}

const deleteMeet =  async(req, res) =>{  
    const { id } = req.params;
    const meet = await Meet.findByIdAndUpdate(id, {status: false});
    res.json({
        meet
    })
}



module.exports = {
    getMeet,
    putMeetGuests,
    putMeetAttendance,
    postMeet,
    deleteMeet
}