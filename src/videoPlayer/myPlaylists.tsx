import { Typography } from '@material-ui/core'
import * as React from 'react'

import { FileUploadButton } from '../components'

export const MyPlaylists = (): JSX.Element => {
    return (
        <>
            <Typography variant="body1">
                Please import a playlist:
            </Typography>
            <FileUploadButton />
        </>
    );
};
