import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import mongoose from "mongoose"
import expressStaticGzip from "express-static-gzip"

import app_router from "./routes/app"
import weather_router from "./routes/weather"
import schedule_router from "./routes/activity"
import error_handler from "./middleware/error_handler"

const { config } = require("dotenv")
config()

import debug from "debug"
const debugLog = debug("app:server:debug")
const errorLog = debug("app:server:error")

const app = express()
debugLog("Starting the server")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "../../", "public")))
app.use(
  "/files",
  expressStaticGzip(path.join(__dirname, "../../", "public"), {
    enableBrotli: true,
  })
)

app.use("/", app_router)
app.use("/weather", weather_router)
app.use("/activity", schedule_router)

app.use(error_handler)

async function start_database() {
  try {
    debugLog("Connecting to database")

    if (!process.env.MONGO_URI) throw "MONGO_URI environment variable is not defined"

    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    errorLog(error)
  }
}

start_database()

//Has to be exported like this to allow the bin/www to import app correctly
module.exports.app = app
module.exports.start_database = start_database
