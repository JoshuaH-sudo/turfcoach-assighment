import React from "react"
import { FC } from "react"
import "@elastic/eui/dist/eui_theme_dark.css"
import "@elastic/charts/dist/theme_dark.css"
// import "../assets/imports.css"
import {
  EuiPage,
  EuiPageBody,
  EuiPageSection,
  EuiPanel,
  EuiProvider,
} from "@elastic/eui"
import Weather_display from "./weather/Weather_display"
import Schedule_display from "./schedule/Schedule_display"
import { Interpolation, Theme } from "@emotion/react"
const fill_panel: Interpolation<Theme> = {
  "& > *": {
    height: "100%",
  },
  "& > * > *": {
    height: "100%",
  },
}

const weather_section: Interpolation<Theme> = {
  "&": {
    height: "50%",
  },
  ...fill_panel,
}

const schedule_section: Interpolation<Theme> = {
  "&": {
    height: "50%",
  },
  ...fill_panel,
}

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPage data-testid="app" style={{ height: "100vh" }}>
        <EuiPageBody>
          <EuiPageSection css={weather_section}>
            <EuiPanel style={{ height: "100" }}>
              <Weather_display />
            </EuiPanel>
          </EuiPageSection>

          <EuiPageSection css={schedule_section}>
            <EuiPanel style={{ height: "100" }}>
              <Schedule_display />
            </EuiPanel>
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </EuiProvider>
  )
}

export default App
