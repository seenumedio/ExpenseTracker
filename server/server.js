require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const txRoutes = require('./routes/txRoutes')

// express app
const app = express()

app.use(cors())
app.use(express.json())

// connecting to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('connencted to db & listening to port', process.env.PORT)
        });
    })
    .catch((err)=>{
        console.log(err)
    })

// routes
app.use('/api/transactions', txRoutes)