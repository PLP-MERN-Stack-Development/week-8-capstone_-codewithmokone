const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    // role: {
    //     type: String,
    //     required: true
    // },
    contactNumber: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('User', UserSchema);