const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    recurring: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        max: 10000000,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true })

// prevent exact duplicates
schema.index(
    { type: 1, category: 1, amount: 1, date: 1, description: 1 },
    { unique: true }
);
module.exports = mongoose.model('Transaction', schema)