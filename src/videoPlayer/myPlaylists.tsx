import { Typography } from '@material-ui/core'
import * as React from 'react'

import { ImportFileButton } from '../components'

const processFile = (fileList: FileList | null): void => {
    // tslint:disable-next-line
    console.log(JSON.stringify(fileList))
}

export const MyPlaylists = (): JSX.Element => {
    return (
        <>
            <Typography variant="body1">
                Please import a playlist:
            </Typography>
            <ImportFileButton
                accept=".json,application/json"
                onFileImported={processFile}
            >
                Import Playlist
            </ImportFileButton>
        </>
    )
}
