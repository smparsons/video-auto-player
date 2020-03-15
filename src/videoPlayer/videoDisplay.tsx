import { Divider, Paper, Typography } from '@material-ui/core'
import Plyr from 'plyr'
import * as React from 'react'

import { Video } from './playlistTypes'

export const VideoDisplay = ({
    autoFullscreen,
    video,
    onVideoFinished
}: VideoDisplayProps): JSX.Element => {
    React.useEffect(() => {
        const player = new Plyr('.video', {
            fullscreen: { fallback: 'force' }
        })

        player.play()
        if (autoFullscreen) player.fullscreen.enter()
        player.on('ended', onVideoFinished)

        return () => {
            player.destroy()
        }
    }, [video.url])

    return (
        <Paper className="video-display-wrapper">
            <div className="video-display">
                {video && (
                    <>
                        <div>
                            <Typography variant="h5">
                                {video.title}
                            </Typography>
                            <Typography className="subtitle">
                                {video.subtitle}
                            </Typography>
                        </div>
                        <Divider />
                        <div key={video.url} className="video-wrapper">
                            <video controls={true} className="video">
                                <source src={video.url} />
                            </video>
                        </div>
                        <Divider />
                        <Typography>
                            {video.description}
                        </Typography>
                    </>
                )}
            </div>
        </Paper>
    )
}

interface VideoDisplayProps {
    autoFullscreen?: boolean,
    video: Video
    onVideoFinished: () => void
}
