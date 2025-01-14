import mongoose, { connect, Schema } from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

declare namespace NodeJS {
    interface ProcessUrl {
        MONGO_URL: string;
    }
}

function ConnectTodb() {
    mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((e) => {
        console.error("Error connecting to the database:", e.message);
    });
}
ConnectTodb();

const UserSchema = new Schema({
    username: { type: String, required: true},
    password: { type: String, required : true },
    email: { type: String, required : true}
});

const User = mongoose.model("user", UserSchema)

export default User