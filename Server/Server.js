import  express  from "express";
import dotenv from "dotenv";
import  cors  from "cors";

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors());

app.use(express.json()) // to use the body-parser ( to get the data from req.body )
app.use(express.urlencoded({ extended: true })) // to got the form data


app.listen(port, () => console.log( `Server running on port ${port} 🔥`));