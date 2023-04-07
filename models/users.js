import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        //if i fetch the userData, then i'll not get password, because it is select:false
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User = mongoose.model("User", schema);