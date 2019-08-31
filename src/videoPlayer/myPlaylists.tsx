import { Typography } from '@material-ui/core'
import * as React from 'react'

import { ImportFileButton } from '../components'
import { Playlist } from './playlistTypes'

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
    const { groups, options } = playlist

    return Array.isArray(groups) && !!options && groups.every((videoGroup) => {
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

export const MyPlaylists = ({ onPlaylistSelected }: MyPlaylistsProps): JSX.Element => {
    const [playlistError, setPlaylistError] = React.useState(null as string | null)

    const processFile = async (fileList: FileList | null): Promise<void> => {
        const importedPlaylist = fileList && fileList[0]
        if (importedPlaylist) {
            const playlistJson = await readPlaylistJsonFromFile(importedPlaylist)
            if (playlistInValidFormat(playlistJson)) {
                onPlaylistSelected(playlistJson)
            } else {
                setPlaylistError("The imported playlist is in an incorrect format.")
            }
        }
    }

    return (
        <>
            <Typography>
                Please import a playlist:
            </Typography>
            <ImportFileButton accept=".json,application/json" onFileImported={processFile}>
                Import Playlist
            </ImportFileButton>
            {playlistError && (
                <Typography className="error-text">
                    {playlistError}
                </Typography>
            )}
        </>
    )
}

interface MyPlaylistsProps {
    onPlaylistSelected: (json: Playlist) => void
}
