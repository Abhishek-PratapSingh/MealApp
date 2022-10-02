require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(
  uri,
  { useNewUrlParser: true }, //useCreateIndex: true }
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

//Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/food', require('./routes/food'));
app.use('/hash', require('./routes/hast'));
app.use('/meal', require('./routes/meal'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
