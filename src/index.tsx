import { CssBaseline } from '@material-ui/core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ApplicationBar } from './components'
import { VideoPlayer } from './videoPlayer'
import './index.css'

export const App = (): JSX.Element => (
    <>
        <CssBaseline />
        <ApplicationBar />
        <VideoPlayer />
    </>
);

ReactDOM.render(<App />, document.getElementById('root'))
