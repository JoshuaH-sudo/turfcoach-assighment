import axios from "axios"
import React, { FC, useEffect, useState } from "react"
import use_api from "../hooks/use_api"

const Weather_display: FC = () => {
  const [weather_report, set_weather_report] = useState({})
  const { get } = use_api()

  const get_location_data: PositionCallback = (data) => {
    const { latitude, longitude } = data.coords
    get_current_weather(latitude, longitude)
  }

  const get_current_weather = async (lat: number, lon: number) => {
    const results = get("weather", { params: { lat, lon }})
    set_weather_report(results)
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error(`Your browser doesn't support Geolocation`)
    }

    navigator.geolocation.getCurrentPosition(get_location_data)
  }, [])

  return (
    <>
      <div>Weather_display</div>
      <div>{JSON.stringify(weather_report)}</div>
    </>
  )
}

export default Weather_display
