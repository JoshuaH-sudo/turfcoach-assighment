import axios from "axios"
import { Request, Response, NextFunction } from "express"

export const get_weather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, lon } = req.params

  if (!lat) return next(Error("lat param not provided"))
  if (!lon) return next(Error("lon param not provided"))

  const results = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
  )

  res.json(results)
}
