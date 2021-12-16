const express = require('express')
const routes = require('./routes/routes')
const mongoose = require("mongoose")
const cookieparser = require('cookie-parser')
const cors = require('cors')
require('dotenv/config')

app = express()

app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}))

app.use(cookieparser())

mongoose.connect(process.env.MovieMatchDB_Connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", error => {
        console.log("Error: ", error);
    })
app.use(express.json())
app.use('/api', routes)



app.listen(8000)