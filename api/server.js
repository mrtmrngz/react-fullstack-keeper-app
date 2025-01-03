import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mainRoutes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 8080

dotenv.config()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.json())

//! router

app.use("/api", mainRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})