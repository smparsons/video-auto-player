import * as React from 'react'

import { Playlist } from './playlistTypes'
import { playlistInValidFormat, readPlaylistJsonFromFile } from './uploadLogic'
import { VideoPlayer } from './videoPlayer'

export const VideoPlayerPage = (): JSX.Element => {
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(null as Playlist | null)
    const [uploadError, setUploadError] = React.useState(null as string | null)

    const displayInvalidPlaylistMessage = () => {
        setSelectedPlaylist(null)
        setUploadError("The imported playlist is in an incorrect format.")
    }

    const processFile = async (fileList: FileList | null): Promise<void> => {
        const importedPlaylist = fileList && fileList[0]
        if (importedPlaylist) {
            try {
                const playlistJson = await readPlaylistJsonFromFile(importedPlaylist)
                if (playlistInValidFormat(playlistJson)) {
                    setSelectedPlaylist(playlistJson)
                    setUploadError(null)
                }
                else {
                    displayInvalidPlaylistMessage()
                }
            }
            catch (error) {
                displayInvalidPlaylistMessage()
            }
        }
    }

    return (
        <VideoPlayer
            currentPlaylist={selectedPlaylist}
            onPlaylistUploaded={processFile}
            uploadError={uploadError}
        />
    )
}
