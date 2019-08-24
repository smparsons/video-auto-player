import { Typography } from '@material-ui/core'
import * as React from 'react'

import { ImportFileButton } from '../components'

const readPlaylistJsonFromFile = (file: File): Promise<Playlist> => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
        const fileReadResult = reader.result as string
        const playlistJson = JSON.parse(fileReadResult)
        resolve(playlistJson)
    }
    reader.readAsText(file)
})

const processFile = async (fileList: FileList | null): Promise<void> => {
    const importedPlaylist = fileList && fileList[0]
    if (!importedPlaylist) {
        throw new Error("There was a problem trying to read the imported file.")
    }
    const playlistJson = await readPlaylistJsonFromFile(importedPlaylist)
    // tslint:disable-next-line
    console.log(JSON.stringify(playlistJson))
}

export const MyPlaylists = (): JSX.Element => {
    return (
        <>
            <Typography variant="body1">
                Please import a playlist:
            </Typography>
            <ImportFileButton
                accept=".json,application/json"
                onFileImported={processFile}
            >
                Import Playlist
            </ImportFileButton>
        </>
    )
}

interface Playlist {
    groups: VideoGroup[]
}

interface VideoGroup {
    groupId: number
    groupName: string
    videos: Video[]
}

interface Video {
    description: string
    title: string
    url: string
}
