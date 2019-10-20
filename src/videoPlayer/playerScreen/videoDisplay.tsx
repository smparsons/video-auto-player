import { Paper, Typography } from '@material-ui/core'
import Plyr from 'plyr'
import * as React from 'react'

import { Video } from '../playlistTypes'

export const VideoDisplay = ({ autoFullscreen, video, onVideoFinished }: VideoDisplayProps): JSX.Element => {
    const videoRef = React.useRef(null)

    React.useEffect(() => {
        const videoDomObject = videoRef.current
        if (videoDomObject) {
            const player = new Plyr(videoDomObject, {
                fullscreen: { fallback: 'force' }
            })

            player.play()
            if (autoFullscreen) player.fullscreen.enter()
            player.on('ended', onVideoFinished)
        }
    })

    return (
        <Paper className="video-player-section">
            <div className="large-gap-grid">
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
                            <div key={video.url} className="video-wrapper">
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
    autoFullscreen?: boolean
    video: Video | null
    onVideoFinished: () => void
}