const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is req'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is req'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is req'],
        minLength: 6,
    }
}, { timestamps: true })

// hash pass before('pre') saving('save') to db
userSchema.pre('save', async function (next) {
    // only executed if pass modified, not other user details
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
/* custom instance method:-
compare user pass with stored hash without decrypt */
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);