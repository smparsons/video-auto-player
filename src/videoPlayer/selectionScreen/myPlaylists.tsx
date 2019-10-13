import { Typography } from '@material-ui/core'
import * as React from 'react'

import { ImportFileButton } from '../../components'
import { Playlist } from '../playlistTypes'
import { PlaylistItemContainer } from './playlistItemContainer'

const readPlaylistJsonFromFile = (file: File): Promise<Playlist> => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
        const fileReadResult = reader.result as string
        const playlistJson = JSON.parse(fileReadResult)
        resolve(playlistJson)
    }
    reader.readAsText(file)
})

// tslint:disable-next-line:no-any
const validateRequiredString = (value: any): boolean => value && typeof value === "string"

const playlistInValidFormat = (playlist: Playlist): boolean => {
    const { groups, name, options } = playlist

    return Array.isArray(groups)
        && validateRequiredString(name)
        && !!options
        && groups.every((videoGroup) => {
        const { groupId, groupName, videos } = videoGroup

        return Number.isInteger(groupId)
            && validateRequiredString(groupName)
            && Array.isArray(videos) && videos.every((video) => {
                const { description, title, url, videoId } = video

                return validateRequiredString(description)
                    && validateRequiredString(title)
                    && validateRequiredString(url)
                    && Number.isInteger(videoId)
            })
    })
}

const fetchPlaylists = (): Playlist[] => {
    const storedPlaylists = localStorage.getItem('playlists')
    return storedPlaylists ? JSON.parse(storedPlaylists) : {}
}

const storePlaylist = (existingPlaylists: Playlist[], changedPlaylist: Playlist): void => {
    const updatedPlaylists = {
        ...existingPlaylists,
        [changedPlaylist.name]: changedPlaylist
    }
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists))
}

export const MyPlaylists = ({ onPlaylistSelected }: MyPlaylistsProps): JSX.Element => {
    const [playlistError, setPlaylistError] = React.useState(null as string | null)
    const [playlists, setPlaylists] = React.useState(null as Playlist[] | null)

    React.useEffect(() => {
        const myPlaylists = fetchPlaylists()
        setPlaylists(myPlaylists)
    }, [])

    const processFile = async (fileList: FileList | null): Promise<void> => {
        const importedPlaylist = fileList && fileList[0]
        if (playlists && importedPlaylist) {
            const playlistJson = await readPlaylistJsonFromFile(importedPlaylist)
            if (playlistInValidFormat(playlistJson)) {
                storePlaylist(playlists, playlistJson)
                onPlaylistSelected(playlistJson)
            } else {
                setPlaylistError("The imported playlist is in an incorrect format.")
            }
        }
    }

    return (
        <div className="extra-large-gap-grid">
            <div className="medium-gap-column-grid">
                <ImportFileButton accept=".json,application/json" onFileImported={processFile}>
                    Import Playlist
                </ImportFileButton>
                {playlistError && (
                    <Typography className="error-text">
                        {playlistError}
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
    onPlaylistSelected: (json: Playlist) => void
}
