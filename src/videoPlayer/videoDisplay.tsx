import { Paper, Typography } from '@material-ui/core'
import * as React from 'react'

import { Video } from './playlistTypes'

export const VideoDisplay = ({ video }: VideoDisplayProps) => {
    return (
        <Paper className="video-player-section">
            <div className="video-display">
                {video
                    ? (
                        <>
                            <Typography variant="h5">
                                {video.title}
                            </Typography>
                            <div key={video.url}>
                                <video controls={true}>
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
