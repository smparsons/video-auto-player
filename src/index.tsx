import { AppBar, createMuiTheme, CssBaseline, Toolbar, Typography } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppRouter } from './appRouter'
import '../styles/app.css'
import '../styles/plyr.min.css'

const ApplicationBar = (): JSX.Element => (
    <AppBar position="static" className="navigation-bar">
        <Toolbar variant="dense">
            <Typography variant="h6">Video AutoPlayer</Typography>
        </Toolbar>
    </AppBar>
)

export const App = (): JSX.Element => {
    const theme = createMuiTheme({ palette: { type: 'dark' } })
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ApplicationBar />
            <AppRouter />
        </MuiThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
