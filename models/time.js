const mongoose = require('mongoose');

//const Schema = mongoose.Schema;

const timeSchema = new mongoose.Schema({
    day: String,
    time: Number,
    users: [String],
    days: [String]
})

const TimeModel = mongoose.model('Time', timeSchema);

module.exports = TimeModel;