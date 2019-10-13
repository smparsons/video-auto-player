import * as React from 'react'

import { VideoPlayer } from './playerScreen/'
import { Playlist } from './playlistTypes'
import { MyPlaylists } from './selectionScreen'

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
