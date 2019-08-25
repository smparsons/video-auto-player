import { Paper, Typography } from '@material-ui/core'
import * as React from 'react'

import { Video } from './playlistTypes'

export const VideoDisplay = ({ video, onVideoFinished }: VideoDisplayProps): JSX.Element => {
    // Using any here because the typings for HTMLVideoElement don't seem
    // to have some of the fullscreen API functions.
    /* tslint:disable-next-line:no-any */
    const videoRef = React.useRef(null) as React.RefObject<any>

    React.useEffect(() => {
        const videoDomObject = videoRef.current
        if (videoDomObject) {
            videoDomObject.play()

            const enterFullscreenMode = videoDomObject.requestFullscreen
                || videoDomObject.webkitRequestFullscreen
                || videoDomObject.mozRequestFullScreen
                || videoDomObject.msRequestFullscreen

            enterFullscreenMode.call(videoDomObject)

            videoDomObject.addEventListener('ended', () => {
                const exitFullscreenMode = videoDomObject.exitFullscreen
                    || videoDomObject.webkitExitFullscreen
                    || videoDomObject.mozCancelFullScreen
                    || videoDomObject.msExitFullscreen

                exitFullscreenMode.call(videoDomObject)

                onVideoFinished()
            }, false)
        }
    })

    return (
        <Paper className="video-player-section">
            <div className="video-display">
                {video
                    ? (
                        <>
                            <div>
                                <Typography variant="h5">
                                    {video.title}
                                </Typography>
                                <Typography>
                                    {video.subtitle}
                                </Typography>
                            </div>
                            <div key={video.url}>
                                <video controls={true} ref={videoRef}>
                                    <source src={video.url} />
                                </video>
                            </div>
                            <Typography>
                                {video.description}
                            </Typography>
                        </>
                    )
                    : <Typography>Please select a video.</Typography>
                }
            </div>
        </Paper>
    )
}

interface VideoDisplayProps {
    video: Video | null
    onVideoFinished: () => void
}
