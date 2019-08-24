import { AppBar, Toolbar, Typography } from '@material-ui/core'
import * as React from 'react'

export const ApplicationBar = (): JSX.Element => (
    <AppBar position="static" className="navigation-bar">
        <Toolbar variant="dense">
            <Typography variant="h6">AutoPlaylist</Typography>
        </Toolbar>
    </AppBar>
)
