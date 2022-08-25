const mongoose = require('mongoose');

//const Schema = mongoose.Schema;

const RoomSchema = new mongoose.Schema({
    // RoomID = Room name with no spaces + GoogleID * Google ID and take the 5 middle digits
    //_id: Object,
    name: String,
    users: [String],
    days: [String],
    times: [String],
    owner_id: String,
    availability: [], //an array of arrays
    custom_times: Object, // object full of room objects
    user_lookup_table: Object

})

const RoomModel = mongoose.model('Room', RoomSchema);

module.exports = RoomModel;