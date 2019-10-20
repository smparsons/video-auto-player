import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ApplicationBar } from './components'
import { VideoPlayerPage } from './videoPlayer'
import './css/index.css'
import './css/plyr.min.css'

export const App = (): JSX.Element => {
    const theme = createMuiTheme({ palette: { type: 'dark' } });
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ApplicationBar />
            <VideoPlayerPage />
        </MuiThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
