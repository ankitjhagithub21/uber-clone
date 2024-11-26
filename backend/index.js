require('dotenv').config()
const express = require('express')
const connectDB = require('./db/conn')
const userRouter = require('./routes/userRoutes')
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())


app.get('/', (req, res) => {
  res.json({
    message:"Api working."
  })
})

app.use("/api/users",userRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})