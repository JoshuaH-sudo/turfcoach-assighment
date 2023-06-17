import React from "react"
import { FC } from "react"
import "@elastic/eui/dist/eui_theme_dark.css"
import "@elastic/charts/dist/theme_dark.css"
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
import Notification_provider from "./Notification_provider"
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
    height: "20em",
    paddingBottom: 0,
  },
  ...fill_panel,
}

// Schedule section should take up remaining space
const schedule_section: Interpolation<Theme> = {
  "&": {
    height: "100%",
  },
  ...fill_panel,
}

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <Notification_provider>
        <EuiPage data-testid="app" style={{ height: "100vh" }}>
          <EuiPageBody>
            <EuiPageSection grow={false} css={weather_section}>
              <EuiPanel style={{ height: "100" }}>
                <Weather_display />
              </EuiPanel>
            </EuiPageSection>

            <EuiPageSection grow={true} css={schedule_section}>
              <EuiPanel
                style={{
                  height: "100",
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                }}
              >
                <Schedule_display />
              </EuiPanel>
            </EuiPageSection>
          </EuiPageBody>
        </EuiPage>
      </Notification_provider>
    </EuiProvider>
  )
}

export default App
