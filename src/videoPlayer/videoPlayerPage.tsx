import * as React from 'react'

import { MyPlaylists } from './myPlaylists'
import { VideoPlayer } from './videoPlayer'

export const VideoPlayerPage = (): JSX.Element => {
    const [playlistJson] = React.useState(null)
    return (
        <div className="video-player-wrapper">
            {playlistJson ? <VideoPlayer /> : <MyPlaylists />}
        </div>
    )
}
