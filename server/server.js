require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const txRoutes = require('./routes/txRoutes')
const authRoutes = require('./routes/authRoutes')

// express app
const app = express()

app.use(cors({
    origin: "https://xpenseprime.netlify.app/",
    credentials: true
  }));
app.use(express.json())

// connecting to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to port
        app.listen(process.env.PORT || 4000, () => {
            console.log('connencted to db & listening to port', process.env.PORT)
        });
    })
    .catch((err)=>{
        console.log(err)
    })

// routes
app.use('/api/transactions', txRoutes)
app.use('/api/auth', authRoutes)