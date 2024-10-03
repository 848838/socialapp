const mongoose = require('mongoose');


const shortsSchema = new mongoose.Schema({
    name: [{
        type: String,
        required: true

    }], 
    image: [],
    Date_Bookig:[],
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Shorts = mongoose.model("Shorts", shortsSchema)
module.exports = Shorts;