import { Grid } from '@material-ui/core'
import * as React from 'react'

import { PlaylistContent } from './playlistContent'
import { Playlist, Video, VideoGroup } from './playlistTypes'
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

const buildNextVideoMap = (groups: VideoGroup[]): NextVideoMap => {
    const flattenedVideos = flatMap(groups, ({ videos }) => videos)
    return flattenedVideos.reduce((currentMap, video, index, videos) => ({
        ...currentMap,
        [video.videoId]: videos[index + 1] || null
    }), {})
}

export const VideoPlayer = ({ playlist }: VideoPlayerProps): JSX.Element => {
    const [videoPlayerState, setVideoPlayerState] = React.useState(videoPlayerInitialState)
    const nextVideoMapRef = React.useRef<NextVideoMap | null>(null)

    const getNextVideo = (currentVideoId: number): Video => {
        if (nextVideoMapRef.current === null) {
            const { groups } = playlist
            nextVideoMapRef.current = buildNextVideoMap(groups)
        }
        return nextVideoMapRef.current[currentVideoId]
    }

    const { currentVideo, nextVideo } = videoPlayerState
    const { options: { autoFullscreen } } = playlist;

    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} md={8} sm={12} xs={12}>
                <VideoDisplay
                    video={currentVideo}
                    autoFullscreen={autoFullscreen}
                    onVideoFinished={() => {
                        if (nextVideo) {
                            setVideoPlayerState({
                                currentVideo: nextVideo,
                                nextVideo: getNextVideo(nextVideo.videoId)
                            })
                        }
                     }}
                />
            </Grid>
            <Grid item={true} md={4} sm={12} xs={12}>
                <PlaylistContent
                    playlist={playlist}
                    currentVideo={currentVideo}
                    onVideoSelected={(selectedVideo) => {
                        setVideoPlayerState({
                            currentVideo: selectedVideo,
                            nextVideo: getNextVideo(selectedVideo.videoId)
                        })
                    }}
                />
            </Grid>
        </Grid>
    )
}

interface VideoPlayerProps {
    playlist: Playlist
}
