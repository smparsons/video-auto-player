import { Typography } from '@material-ui/core'
import * as React from 'react'

import { ImportFileButton } from '../../components'
import { Playlist } from '../playlistTypes'
import { PlaylistItemContainer } from './playlistItemContainer'

export const MyPlaylists = ({
    playlists,
    onPlaylistSelected,
    onPlaylistUploaded,
    uploadError
}: MyPlaylistsProps): JSX.Element => {
    return (
        <div className="extra-large-gap-grid">
            <div className="medium-gap-column-grid">
                <ImportFileButton accept=".json,application/json" onFileImported={onPlaylistUploaded}>
                    Import Playlist
                </ImportFileButton>
                {uploadError && (
                    <Typography className="error-text">
                        {uploadError}
                    </Typography>
                )}
            </div>
            <PlaylistItemContainer
                playlists={playlists}
                onPlaylistOpen={onPlaylistSelected}
            />
        </div>
    )
}

interface MyPlaylistsProps {
    playlists: Playlist[] | null
    onPlaylistSelected: (json: Playlist) => void
    onPlaylistUploaded: (fileList: FileList | null) => void
    uploadError: string | null
}
