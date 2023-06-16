import React from "react"
import { FC } from "react"
import "@elastic/eui/dist/eui_theme_dark.css"
import "@elastic/charts/dist/theme_dark.css"
// import "../assets/imports.css"
import { EuiPage, EuiPageBody, EuiPageSection, EuiProvider } from "@elastic/eui"
import Weather_display from "./weather/Weather_display"
import Schedule_display from "./schedule/Schedule_display"

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPage data-testid="app" style={{ height: "100vh" }}>
        <EuiPageBody>
          <EuiPageSection style={{ height: "25%" }}>
            <Weather_display />
          </EuiPageSection>
          <EuiPageSection style={{ height: "75%" }}>
            <Schedule_display />
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </EuiProvider>
  )
}

export default App
