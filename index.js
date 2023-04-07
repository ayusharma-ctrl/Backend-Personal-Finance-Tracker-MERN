import express from 'express';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import userRouter from './routes/users.js'
import transactionRouter from './routes/transactions.js'


//initializing our server
const app = express();

//setting up config.env file so that we can use content of it
config({
    path: "./config.env"
})


//connecting with mongoDB database
//connecting app with database,
//1.We enter URI of DB, then options,i.e., dbName
//2.It will return a promise 
export const connectMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PFT-backend",
    }).then(() => {
        console.log("Database is connected!")
    }).catch((e) => console.log(e));
}

connectMongoDB(); 


//using middleware...

//we are sending json data, that's why it is required to use the middleware, we have to use it before using router
//otherwise json data will not be send and it will not work
app.use(express.json());

//to read the token
app.use(cookieParser())

//using cors cuz we have different url's, local & deployed
//'credentials: true' to pass --> headers, cookies, etc to browser/frontend
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

//sharing router we are doing route-splitting, basically '/users' & '/transactions' will be a part of each route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is working on Port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`);
})

//home route.. first api
app.get("/", (req, res) => {
    res.send("Welcome to Personal Finance Tracker App!!!")
})