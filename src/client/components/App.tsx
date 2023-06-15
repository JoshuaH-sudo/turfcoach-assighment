import React from "react"
import { FC } from "react"
import "@elastic/eui/dist/eui_theme_dark.css"
import '@elastic/charts/dist/theme_dark.css';

import {
  EuiPage,
  EuiPageBody,
  EuiPageSection,
  EuiProvider,
} from "@elastic/eui"

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPage data-testid="app">
        <EuiPageBody>
          <EuiPageSection>
            hello world
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </EuiProvider>
  )
}

export default App
