var express = require('express') ;
var mongoose = require('mongoose');
var UserModel = require('./models/user.js');
var RoomModel = require('./models/room.js');
//var TimeModel = require('./models/time.js');
require("dotenv").config();

const cors = require('cors');
URI = MongoDB-URI HERE

const app = express();
app.use(express.json());
app.use(cors());


const PORT = 5000;

const herokuPort = process.env.PORT;


mongoose.connect(URI)
//console.log(process.env.PORT);
//app.listen(process.env.REACT_APP_PORT, () => {
app.listen(herokuPort || PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get("/getUser/:gid", (req, res) => {
    UserModel.find({googleID:req.params.gid}, (err, result) => {
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get("/getRooms", (req, res) => {
    RoomModel.find({}, (err, result) => {
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get('/getRoom/:id', (req, res) => {
    RoomModel.find({_id: mongoose.Types.ObjectId(req.params.id.trim()) } , (err, result) => {
        if(err){
            console.log("failed to find")
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get("/getTimes", (req, res) => {
    TimeModel.find({}, (err, result) => {
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.post("/addUser", async (req, res) => {
    console.log("we got called to try to post");
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    console.log("we got called to post");
    res.json(user);   
})

app.post("/addRoom", async (req, res) => {
    try{
    let ID;
    const room = req.body;
    const newRoom = new RoomModel(room);
    await newRoom.save((err, outcome)=> 
    {res.json(outcome._id)});
    
    ;  
    }
    catch(err){
        console.log(err);
    } 
})

//Used in calendar.js for updating availability
app.put('/putRoom/:id', async (req, res) => {
    RoomModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id.trim()) } , {availability:req.body}, (err, result) => {
        if(err){
            console.log("failed to find")
            res.json(err);
        } else {
            console.log(result);
            console.log(req.body);
        }
    })
    //console.log("we ran this");
})

//Used in custom-panel.js for updating custom
app.put('/putRoomCustom/:id', async (req, res) => {
    RoomModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id.trim()) } , {custom_times:req.body}, (err, result) => {
        if(err){
            console.log("failed to find")
            res.json(err);
        } else {
            console.log(result);
            console.log(req.body);
        }
    })
    //console.log("we ran this");
})

//Used in App.js for updating users and user_lookup_table
app.put('/putUserInRoom/:id', async (req, res) => {
    RoomModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id.trim()) } , 
    {
        $set:{
       "users":req.body.users,
       "user_lookup_table": req.body.user_lookup_table
       
      
    }
    }, (err, result) => {
        if(err){
            console.log("failed to find")
            res.json(err);
        } else {
            console.log(result);
            console.log(req.body);
        }
    })
    //console.log("we ran this");
})

//Show a user they own a room
app.put('/putUser/ownsRoom/:id', async (req, res) => {
    UserModel.findOneAndUpdate({googleID:req.params.id} , {owned_rooms:req.body}, (err, result) => {
        if(err){
            console.log("failed to find");
            res.json(err);
        } else {
            console.log(result);
            console.log(req.body);
            return res.body;
        }
    })
    console.log("we ran this");
})

//Show a user they are in a room
app.put('/putUser/inRoom/:id', async (req, res) => {
    UserModel.findOneAndUpdate({googleID:req.params.id} , {in_rooms:req.body}, (err, result) => {
        if(err){
            console.log("failed to find")
            res.json(err);
        } else {
            //console.log(result);
            //console.log(req.body);
        }
    })
    //console.log("we ran this");
})


//Delete a room from the inRooms
app.put('/removeUser/inRoom/:id', async (req, res) => {
    UserModel.findOneAndUpdate({googleID:req.params.id} , {$pull: {in_rooms:req.body.target}}, (err, result) => {
        if(err){
            console.log("failed to find")
            res.json(err);
        } else {
            //console.log(result);
            //console.log(req.body);
        }
    })
    console.log("we ran this for in room");
})

//Delete a room from the ownedRooms
app.put('/removeUser/ownsRoom/:id', async (req, res) => {
    UserModel.findOneAndUpdate({googleID:req.params.id} , {$pull: {owned_rooms:req.body.target}}, {new:true}, (err, result) => {
        if(err){
            console.log("failed to find");
            res.json(err);
        } else {
            //console.log(res);
            console.log(req.body.target);
            return res.body;
        }
    })
    console.log("we ran this for owned room");
})

//Delete a room
app.delete('/deleteRoom/:id', async (req, res) => {
    RoomModel.deleteOne({_id: mongoose.Types.ObjectId(req.params.id.trim())}, (err, result) => {
        if(err){
            console.log("failed to delete");
            res.json(err);
        } else {
            console.log(result);
            console.log(req.body);
            return res.body;
        }
    })
})
