const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    recurring:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required:true
    },
    description:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{timestamps: true})

// prevent exact duplicates
schema.index(
    { type: 1, category: 1, amount: 1, date: 1, description: 1 },
    { unique: true }
);
module.exports = mongoose.model('Transaction', schema)