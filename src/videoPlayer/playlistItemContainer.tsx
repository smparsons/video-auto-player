import { Typography } from '@material-ui/core'
import * as React from 'react'

import { PlaylistItem } from './playlistItem'
import { Playlist } from './playlistTypes'

export const PlaylistItemContainer = ({ playlists, onPlaylistOpen }: PlaylistItemContainerProps): JSX.Element => {
    const playlistCollection = playlists ? Object.values(playlists) : null
    return (
        <div>
            <Typography variant="h3">My Playlists</Typography>
            {playlistCollection
                ? (
                    <div className="playlist-item-container">
                        {playlistCollection.length > 0
                            ? (
                                playlistCollection.map((playlist) =>
                                    <PlaylistItem
                                        key={playlist.name}
                                        playlist={playlist}
                                        onOpen={onPlaylistOpen}
                                    />
                                )
                            )
                            : <Typography>You currently do not have any playlists.</Typography>
                        }
                    </div>
                )
                : <Typography>Loading...</Typography>
            }
        </div>
    )
}

interface PlaylistItemContainerProps {
    playlists: Playlist[] | null
    onPlaylistOpen: (playlist: Playlist) => void
}
