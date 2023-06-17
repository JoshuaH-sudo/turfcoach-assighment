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
import { EuiGlobalStyles, EuiLoadingSpinner } from "@elastic/eui"
import { Global, Interpolation, Theme } from "@emotion/react"
import { number } from "prop-types"

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
      console.error(`Your browser doesn't support Geolocation`)
    }

    navigator.geolocation.getCurrentPosition(get_location_data, on_position_error)
  }, [])

  if (!weather_report) {
    return <EuiLoadingSpinner size="xxl" style={{ margin: "auto" }} />
  }

  const chart_size: Interpolation<Theme> = {
    ".echChart": {
      width: "100%",
      height: "50%",
    },
  }
  return (
    <>
      {weather_report.weather.map((report) => (
        <img src={`https://openweathermap.org/img/wn/${report.icon}@2x.png`} />
      ))}

      <Global styles={chart_size} />

      <Chart>
        <Settings baseTheme={DARK_THEME} theme={EUI_CHARTS_THEME_DARK.theme} />
        <Metric
          id="metricId"
          data={[
            [
              {
                color: "#6699FF",
                title: "Rain 1h",
                value: weather_report.rain?.["1h"] ?? 0,
                //On average 50mm of rain is considered violent levels.
                //https://www.baranidesign.com/faq-articles/2020/1/19/rain-rate-intensity-classification
                domainMax: 50,
                progressBarDirection: LayoutDirection.Vertical,
                extra: (
                  <span>
                    Rain 3h:{" "}
                    <strong>{`${weather_report.rain?.["3h"] ?? 0}`}mm</strong>
                  </span>
                ),
                valueFormatter: (v) => `${v}mm`,
              },
              {
                color: get_temperature_colour(weather_report.main.temp),
                title: "Temperature",
                extra: (
                  <>
                    <span>
                      Feels like{" "}
                      <strong>{`${weather_report.main.feels_like}`}&deg;</strong>
                    </span>
                    <span>
                      Max <strong>{`${weather_report.main.temp_max}`}&deg;</strong>
                    </span>
                    <span>
                      Min
                      <strong>{`${weather_report.main.temp_min}`}&deg;</strong>
                    </span>
                  </>
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

const get_temperature_colour = (degrees: number) => {
  if (degrees <= -10) return "#0033FF"
  if (degrees <= 10) return "#CC00FF"
  if (degrees <= 15) return "#0033FF"
  if (degrees <= 24) return "#FFFF00"
  else return "#FF0033"
}
export default Weather_display
