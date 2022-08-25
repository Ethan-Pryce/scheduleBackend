const mongoose = require('mongoose');

//const Schema = new mongoose.Schema;

const UserSchema = new mongoose.Schema({
    googleID: String,
    name: String,
    owned_rooms: [],
    in_rooms: []
})

const UserModel = mongoose.model('User', UserSchema);
//console.log(UserModel);
module.exports = UserModel;

//export const User;