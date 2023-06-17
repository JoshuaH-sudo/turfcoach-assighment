import React, { FC, ReactNode, useEffect, useState } from "react"
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
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiGlobalStyles,
  EuiLoadingSpinner,
  EuiSkeletonText,
  useEuiTheme,
} from "@elastic/eui"
import { Global, Interpolation, Theme } from "@emotion/react"
import { use_rain_metric } from "./hooks/use_rain_metric"
import { use_temperature_metric } from "./hooks/use_temperature_metric"

interface Weather_report {
  description: string
  icon: string
  id: number
  main: string
}
/**
 * A partial type of only relevant data returned from getting the current weather
 */
export interface Current_Weather {
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
  /**
   * Expected rain in the next 1 - 3 hours
   */
  rain?: {
    "1h": number
    "3h": number
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
      alert(`Your browser doesn't support Geolocation`)
    }

    navigator.geolocation.getCurrentPosition(get_location_data, on_position_error)
  }, [])

  let weather_icons: ReactNode = (
    <EuiLoadingSpinner size="xxl" style={{ padding: "40px", margin: "auto" }} />
  )
  if (weather_report) {
    weather_icons = weather_report.weather.map((report) => (
      <EuiFlexItem grow={false}>
        <img
          key={report.id}
          style={{ margin: "auto" }}
          src={`https://openweathermap.org/img/wn/${report.icon}@2x.png`}
        />
      </EuiFlexItem>
    ))
  }

  const rain_metric = use_rain_metric(weather_report)
  const temperature_metric = use_temperature_metric(weather_report)

  return (
    <>
      <EuiFlexGroup
        style={{
          height: "100%",
          width: "100%",
          paddingLeft: "10em",
          paddingRight: "10em",
        }}
      >
        {weather_icons}

        <EuiFlexItem>
          <Chart>
            <Settings baseTheme={DARK_THEME} theme={EUI_CHARTS_THEME_DARK.theme} />
            <Metric id="metricId" data={[[rain_metric, temperature_metric]]} />
          </Chart>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )
}
export default Weather_display
