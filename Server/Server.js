import  express  from "express";
import dotenv from "dotenv";
import  cors  from "cors";
import mongoose from "mongoose";


import AdminRoutes from './routes/AdminRoutes.js'
import UserRoutes from './routes/UserRoutes.js'

dotenv.config();


const app = express()

app.use(cors());

app.use(express.json()) // to use the body-parser ( to get the data from req.body )
app.use(express.urlencoded({ extended: true })) // to got the form data


//routes config
app.use('/api/admin' , AdminRoutes)
app.use('/api/user' , UserRoutes)



mongoose.connect(process.env.MONGO_URL);
const conn = mongoose.connection

conn.once('open' , ()=> {
    console.log('Database connected successfully')
})

conn.on('error' , () => {
    console.log('Error connecting to database')
    process.exit()
})

app.listen(process.env.PORT, () => console.log( `Server running on port ${process.env.PORT} 🔥`));
