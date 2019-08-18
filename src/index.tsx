import { CssBaseline } from '@material-ui/core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ApplicationBar } from './components'
import { VideoPlayerPage } from './videoPlayer'
import './index.css'

export const App = (): JSX.Element => (
    <>
        <CssBaseline />
        <ApplicationBar />
        <VideoPlayerPage />
    </>
);

ReactDOM.render(<App />, document.getElementById('root'))
