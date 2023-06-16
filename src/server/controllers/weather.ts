import axios from "axios"
import { Request, Response, NextFunction } from "express"

import debug from "debug"
const debug_log = debug("app:weather_controller:debug")
const error_log = debug("app:weather_controller:error")

interface Get_weather_query {
  lat: number
  lon: number
}
export const get_weather = async (
  req: Request<{}, {}, {}, Get_weather_query>,
  res: Response,
  next: NextFunction
) => {
  const { lat, lon } = req.query

  if (!lat) return next(Error("lat param not provided"))
  if (!lon) return next(Error("lon param not provided"))

  try {
    debug_log("Getting current weather data")

    const api_url = new URL("https://api.openweathermap.org/data/2.5/weather")
    api_url.searchParams.append("lat", lat.toString())
    api_url.searchParams.append("lon", lon.toString())
    api_url.searchParams.append("appid", process.env.WEATHER_API_KEY ?? "")
    api_url.searchParams.append("units", "metric")

    debug_log(`Sending request to API: ${api_url.toString()}`)
    //`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    const results = await axios.get(api_url.toString())

    return res.json(results.data)
  } catch (error) {
    error_log("Failed to get weather")
    error_log(error)

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
