const mongoose = require('mongoose')


const Profile = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
        unique: true
    },
    candy:{
        type: Number,
        required: false,
        default: 0
    },
    stage:{
        type: Number,
        required: false,
        default: 1
    },
    tries:{
        type:Number,
        required: false,
        default: 0
    }

})


module.exports = mongoose.model('profile', Profile)