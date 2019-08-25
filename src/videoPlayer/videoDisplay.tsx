import { Paper, Typography } from '@material-ui/core'
import * as React from 'react'

import { Video } from './playlistTypes'

export const VideoDisplay = ({ video }: VideoDisplayProps) => {
    const videoRef = React.useRef(null) as React.RefObject<HTMLVideoElement>

    React.useEffect(() => {
        const videoDomObject = videoRef.current
        if (videoDomObject) {
            videoDomObject.play()
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
}
