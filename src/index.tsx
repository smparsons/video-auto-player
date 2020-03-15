import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { VideoPlayerPage } from './videoPlayer'
import '../styles/app.css'
import '../styles/plyr.min.css'

export const App = (): JSX.Element => {
    const theme = createMuiTheme({ palette: { type: 'dark' } })
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <VideoPlayerPage />
        </MuiThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
