import * as React from 'react'

import { VideoPlayer } from './playerScreen/'
import { Playlist } from './playlistTypes'
import { MyPlaylists } from './selectionScreen'
import { playlistInValidFormat, readPlaylistJsonFromFile } from './uploadLogic'

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

export const VideoPlayerPage = (): JSX.Element => {
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(null as Playlist | null)
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
                setSelectedPlaylist(playlistJson)
            } else {
                setPlaylistError("The imported playlist is in an incorrect format.")
            }
        }
    }

    return (
        <div className="video-player-wrapper">
            {selectedPlaylist
                ? <VideoPlayer playlist={selectedPlaylist} />
                : (
                    <MyPlaylists
                        playlists={playlists}
                        onPlaylistSelected={setSelectedPlaylist}
                        onPlaylistUploaded={processFile}
                        uploadError={playlistError}
                    />
                )
            }
        </div>
    )
}
