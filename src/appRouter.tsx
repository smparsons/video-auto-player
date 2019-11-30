import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { PlaylistBuilder } from './playlistBuilder'
import { VideoPlayerPage } from './videoPlayer'

export const AppRouter = (): JSX.Element => (
    <HashRouter>
        <Switch>
            <Route exact={true} path='/' component={VideoPlayerPage} />
            <Route path='/playlist-builder' component={PlaylistBuilder} />
        </Switch>
    </HashRouter>
)
