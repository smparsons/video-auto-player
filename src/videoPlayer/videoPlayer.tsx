import { Grid } from '@material-ui/core'
import * as React from 'react'

import { PlaylistSidebar } from './playlistSidebar'
import { Playlist, Video } from './playlistTypes'
import { VideoDisplay } from './videoDisplay'

interface VideoPlayerState {
    currentVideo: Video | null
    nextVideo: Video | null
}

const videoPlayerInitialState = {
    currentVideo: null,
    nextVideo: null
} as VideoPlayerState

interface NextVideoMap { [currentVideoId: number]: Video }

const flatMap = <T, U>(array: T[], callbackFn: (value: T, index: number, array: T[]) => U[]): U[] => {
    return Array.prototype.concat(...array.map(callbackFn))
}

const buildNextVideoMap = (playlist: Playlist | null): NextVideoMap => {
    const groups = playlist ? playlist.groups : []
    const flattenedVideos = flatMap(groups, ({ videos }) => videos)
    return flattenedVideos.reduce((currentMap, video, index, videos) => ({
        ...currentMap,
        [video.title]: videos[index + 1] || null
    }), {})
}

export const VideoPlayer = ({ currentPlaylist, onPlaylistUploaded, uploadError }: VideoPlayerProps): JSX.Element => {
    const [videoPlayerState, setVideoPlayerState] = React.useState(videoPlayerInitialState)
    const nextVideoMapRef = React.useRef<NextVideoMap | null>(null)

    React.useEffect(() => {
        setVideoPlayerState(videoPlayerInitialState)
        nextVideoMapRef.current = null
    }, [currentPlaylist && currentPlaylist.name])

    const getNextVideo = (currentVideoTitle: string): Video => {
        if (nextVideoMapRef.current === null) {
            nextVideoMapRef.current = buildNextVideoMap(currentPlaylist)
        }
        return nextVideoMapRef.current[currentVideoTitle]
    }

    const { currentVideo, nextVideo } = videoPlayerState
    const { options } = currentPlaylist || {}
    const { autoFullscreen } = options || {}

    return (
        <Grid container={true}>
            <Grid item={true} md={3} sm={12} xs={12}>
                <PlaylistSidebar
                    playlist={currentPlaylist}
                    onPlaylistUploaded={onPlaylistUploaded}
                    uploadError={uploadError}
                    currentVideo={currentVideo}
                    onVideoSelected={(selectedVideo) => {
                        setVideoPlayerState({
                            currentVideo: selectedVideo,
                            nextVideo: getNextVideo(selectedVideo.title)
                        })
                    }}
                />
            </Grid>
            <Grid item={true} md={9} sm={12} xs={12}>
                {currentPlaylist && currentVideo && (
                    <VideoDisplay
                        video={currentVideo}
                        autoFullscreen={autoFullscreen}
                        onVideoFinished={() => {
                            if (nextVideo) {
                                setVideoPlayerState({
                                    currentVideo: nextVideo,
                                    nextVideo: getNextVideo(nextVideo.title)
                                })
                            }
                        }}
                    />
                )}
            </Grid>
        </Grid>
    )
}

interface VideoPlayerProps {
    currentPlaylist: Playlist | null,
    onPlaylistUploaded: (fileList: FileList | null) => void
    uploadError: string | null
}
