import { Button, Typography } from '@material-ui/core'
import * as React from 'react'

import { ExportFileButton } from '../components'
import { Playlist } from './playlistTypes'

export const PlaylistItem = ({ playlist, onOpen }: PlaylistProps): JSX.Element => {
    const { name } = playlist
    return (
        <div className="medium-gap-column-grid">
            <Typography variant="h5">{name}</Typography>
            <Button color="primary" variant="contained" onClick={() => onOpen(playlist)}>
                Open
            </Button>
            <ExportFileButton name={`${name}.json`} content={JSON.stringify(playlist)}>
                Export
            </ExportFileButton>
        </div>
    )
}

interface PlaylistProps {
    playlist: Playlist
    onOpen: (playlist: Playlist) => void
}
