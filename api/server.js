import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mainRoutes from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
dotenv.config()
app.use(logger('dev'))

//! router

app.use("/api", mainRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})