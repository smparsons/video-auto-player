import { Button, Typography } from '@material-ui/core'
import * as React from 'react'

export const VideoPlayer = (): JSX.Element => {
    const [playlistJson] = React.useState(null);
    return (
        <div className="video-player-wrapper">
            {playlistJson
                ? (
                    <Typography variant="body1">This is my video player</Typography>
                )
                : (
                    <>
                        <Typography variant="body1">
                            You have not selected a playlist. Please import a playlist:
                        </Typography>
                        <Button variant="contained" color="primary">
                            Import Playlist
                        </Button>
                    </>
                )
            }
        </div>
    )
}
