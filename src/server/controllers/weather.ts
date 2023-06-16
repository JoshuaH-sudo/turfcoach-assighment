import axios from "axios"
import { Request, Response, NextFunction } from "express"

import debug from "debug"
const debugLog = debug("app:weather_controller:debug")
const errorLog = debug("app:weather_controller:error")

export const get_weather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, lon } = req.query

  if (!lat) return next(Error("lat param not provided"))
  if (!lon) return next(Error("lon param not provided"))

  try {
    debugLog("Getting current weather data")
    const results = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    )

    return res.json(results.data)
  } catch (error) {
    errorLog("Failed to get weather")
    errorLog(error)
    
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        return next(
          Error("Invalid API key set in environment variable WEATHER_API_KEY")
        )
      }
    }

    next(error)
  }
}
