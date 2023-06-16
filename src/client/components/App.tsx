import React from "react"
import { FC } from "react"
import "@elastic/eui/dist/eui_theme_dark.css"
import "@elastic/charts/dist/theme_dark.css"
// import "../assets/imports.css"
import { EuiPage, EuiPageBody, EuiPageSection, EuiProvider } from "@elastic/eui"
import Weather_display from "./weather/Weather_display"
import Schedule_display from "./schedule/Schedule_display"
import Activity_modal from "./activity/Activity_modal"

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPage data-testid="app">
        <EuiPageBody>
          {/* <EuiPageSection>
            <Weather_display />
          </EuiPageSection> */}
          <EuiPageSection>
            <Schedule_display />
            <Activity_modal
              close_modal={() => {
                return
              }}
            />
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </EuiProvider>
  )
}

export default App
