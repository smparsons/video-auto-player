import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PlaylistBuilder } from './playlistBuilder'
import { VideoPlayerPage } from './videoPlayer'

export const AppRouter = (): JSX.Element => (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact={true} path='/' component={VideoPlayerPage} />
            <Route path='/playlist-builder' component={PlaylistBuilder} />
        </Switch>
    </Router>
)
