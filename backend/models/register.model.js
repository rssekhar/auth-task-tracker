import mongoose from "mongoose";

const registerUserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
}, {
    timeseries: true
})

const User = mongoose.model('register', registerUserModel);
export default User;