import { MetricDatum } from "@elastic/charts"
import { EuiSkeletonText, useEuiTheme } from "@elastic/eui"
import React from "react"
import { Current_Weather } from "../Weather_display"

/**
 * Displays the temperature data from the weather report
 *
 * @param weather_report The weather data to display
 * @returns Provides an object to be used by EUI metric chart
 */
export const use_temperature_metric = (weather_report?: Current_Weather) => {
  const { euiTheme } = useEuiTheme()

  const metric: MetricDatum = {
    color: weather_report
      ? get_temperature_colour(weather_report.main.temp)
      : // Set a neutral colour from the current UI theme when no temperature is retrieved yet.
        euiTheme.colors.lightShade,
    title: "Temperature",
    extra: (
      <EuiSkeletonText lines={3} size="s" isLoading={!weather_report}>
        <div>
          <span>
            Min
            <strong>{`${weather_report?.main.temp_min}`}&deg;</strong>
          </span>
        </div>
        <div>
          <span>
            Max <strong>{`${weather_report?.main.temp_max}`}&deg;</strong>
          </span>
        </div>
        <div>
          <span>
            Feels like <strong>{`${weather_report?.main.feels_like}`}&deg;</strong>
          </span>
        </div>
      </EuiSkeletonText>
    ),
    value: weather_report ? weather_report.main.temp : 0,
    valueFormatter: (v) => `${v.toFixed(2)}°`,
  }

  return metric
}

/**
 * Provides a colour that matches to the provided temperature.
 *
 * @param degrees
 * @returns A colour's hex code
 */
const get_temperature_colour = (degrees: number) => {
  if (degrees <= -10) return "#BDE9FF"
  if (degrees <= 10) return "#008CFF"
  if (degrees <= 15) return "#85FF8F"
  if (degrees <= 24) return "#FFFF00"
  else return "#FF0033"
}
