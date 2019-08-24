import { Typography } from '@material-ui/core'
import * as React from 'react'

import { Playlist } from './playlistTypes'

export const VideoPlayer = ({ playlist }: VideoPlayerProps): JSX.Element => (
    <>
        <Typography variant="body1">This is my video player</Typography>
        <Typography variant="body1">
            {JSON.stringify(playlist)}
        </Typography>
    </>
)

interface VideoPlayerProps {
    playlist: Playlist
}
