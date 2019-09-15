import { Button, Typography } from '@material-ui/core'
import * as React from 'react'

import { Playlist } from './playlistTypes'

export const PlaylistItem = ({ playlist, onOpen }: PlaylistProps): JSX.Element => (
    <div className="medium-gap-column-grid">
        <Typography variant="h5">{playlist.name}</Typography>
        <Button color="primary" variant="contained" onClick={() => onOpen(playlist)}>
            Open Playlist
        </Button>
    </div>
)

interface PlaylistProps {
    playlist: Playlist
    onOpen: (playlist: Playlist) => void
}
