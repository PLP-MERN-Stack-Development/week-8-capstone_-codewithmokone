const mongoose = require('mongoose');

const ChatUserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    role: {
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

module.exports = mongoose.model('ChatUser', ChatUserSchema);