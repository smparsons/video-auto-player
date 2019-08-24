import * as React from 'react'

import { MyPlaylists } from './myPlaylists'
import { Playlist } from './playlistTypes'
import { VideoPlayer } from './videoPlayer'

export const VideoPlayerPage = (): JSX.Element => {
    const [playlistJson, setPlaylistJson] = React.useState(null as Playlist | null)

    return (
        <div className="video-player-wrapper">
            {playlistJson
                ? <VideoPlayer playlist={playlistJson} />
                : <MyPlaylists onPlaylistSelected={setPlaylistJson} />
            }
        </div>
    )
}
