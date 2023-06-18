import { MetricDatum, LayoutDirection } from "@elastic/charts"
import { EuiSkeletonText } from "@elastic/eui"
import React from "react"
import { Current_Weather } from "../Weather_display"

/**
 * Displays the rain data from the weather report
 *  
 * @param weather_report The weather data to display
 * @returns Provides an object to be used by EUI metric chart
 */
export const use_rain_metric = (weather_report?: Current_Weather) => {
  const metric: MetricDatum = {
    color: "#6699FF",
    title: "Rain 1h",
    value: weather_report?.rain?.["1h"] ?? 0,
    //On average 50mm of rain is considered violent levels.
    //https://www.baranidesign.com/faq-articles/2020/1/19/rain-rate-intensity-classification
    domainMax: 50,
    progressBarDirection: LayoutDirection.Vertical,
    extra: (
      <EuiSkeletonText lines={1} size="m" isLoading={!weather_report}>
        <span>
          Rain 3h: <strong>{`${weather_report?.rain?.["3h"] ?? 0}`}mm</strong>
        </span>
      </EuiSkeletonText>
    ),
    valueFormatter: (v) => `${v}mm`,
  }

  return metric
}
