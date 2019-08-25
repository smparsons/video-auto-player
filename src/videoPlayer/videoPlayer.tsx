import { Grid } from '@material-ui/core'
import * as React from 'react'

import { PlaylistContent } from './playlistContent'
import { Playlist, Video } from './playlistTypes'
import { VideoDisplay } from './videoDisplay'

export const VideoPlayer = ({ playlist }: VideoPlayerProps): JSX.Element => {
    const [currentVideo, setCurrentVideo] = React.useState(null as Video | null)

    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} md={8} sm={12} xs={12}>
                <VideoDisplay
                    video={currentVideo}
                    onVideoFinished={() => { return }}
                />
            </Grid>
            <Grid item={true} md={4} sm={12} xs={12}>
                <PlaylistContent
                    playlist={playlist}
                    currentVideo={currentVideo}
                    onVideoSelected={setCurrentVideo}
                />
            </Grid>
        </Grid>
    )
}

interface VideoPlayerProps {
    playlist: Playlist
}
