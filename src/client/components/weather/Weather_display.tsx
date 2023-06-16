import React, { FC, useEffect, useState } from "react"
import use_api from "../../hooks/use_api"
import {
  Chart,
  ChartSize,
  DARK_THEME,
  LayoutDirection,
  Metric,
  Settings,
} from "@elastic/charts"
import { EUI_CHARTS_THEME_DARK } from "@elastic/eui/dist/eui_charts_theme"
import { EuiLoadingSpinner } from "@elastic/eui"

interface Weather_report {
  description: string
  icon: string
  id: number
  main: string
}
/**
 * A partial type of only relevant data returned from getting the current weather
 */
interface Current_Weather {
  /**
   * Temperature information
   */
  main: {
    feels_like: number
    humidity: number
    temp: number
    temp_max: number
    temp_min: number
  }
  /**
   * List of weather descriptions
   */
  weather: Weather_report[]
  /**
   * Cloud coverage
   */
  clouds: {
    all: number
  }
}

const Weather_display: FC = () => {
  const [weather_report, set_weather_report] = useState<Current_Weather>()
  const { get } = use_api()

  const get_location_data: PositionCallback = (data) => {
    const { latitude, longitude } = data.coords
    get_current_weather(latitude, longitude)
  }

  const get_current_weather = async (lat: number, lon: number) => {
    try {
      const results = await get<Current_Weather>("weather", { params: { lat, lon } })
      set_weather_report({ ...results.data })
    } catch (error) {
      console.error(error)
    }
  }

  const on_position_error: PositionErrorCallback = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      alert("You must allow location to fetch correct weather data")
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error(`Your browser doesn't support Geolocation`)
    }

    navigator.geolocation.getCurrentPosition(get_location_data, on_position_error)
  }, [])

  if (!weather_report)
    return <EuiLoadingSpinner size="xxl" style={{ margin: "auto" }} />

  return (
    <>
      {weather_report.weather.map((report) => (
        <img src={`https://openweathermap.org/img/wn/${report.icon}@2x.png`} />
      ))}

      <Chart>
        <Settings baseTheme={DARK_THEME} theme={EUI_CHARTS_THEME_DARK.theme} />
        <Metric
          id="metricId"
          data={[
            [
              {
                color: "#F1D86F",
                title: "Humidity",
                value: weather_report?.main.humidity ?? 0,
                domainMax: 100,
                progressBarDirection: LayoutDirection.Vertical,
                valueFormatter: (v) => `${v}%`,
              },
              {
                color: "#F1D86F",
                title: "Cloud Cover",
                value: weather_report?.clouds.all ?? 0,
                domainMax: 100,
                progressBarDirection: LayoutDirection.Vertical,
                valueFormatter: (v) => `${v}%`,
              },
              {
                color: "#8CB2CD",
                title: "Temperature",
                extra: (
                  <span>
                    Feels like{" "}
                    <strong>{`${weather_report.main.feels_like}`}&deg;</strong>
                  </span>
                ),
                value: weather_report.main.temp,
                valueFormatter: (v) => `${v.toFixed(2)}°`,
              },
            ],
          ]}
        />
      </Chart>
    </>
  )
}

export default Weather_display
