import { Typography } from '@material-ui/core'
import * as React from 'react'

import { SelectFileButton } from '../components'

const onFileSelected = (fileList: FileList | null): void => {
    // tslint:disable-next-line
    console.log(JSON.stringify(fileList));
}

export const MyPlaylists = (): JSX.Element => {
    return (
        <>
            <Typography variant="body1">
                Please import a playlist:
            </Typography>
            <SelectFileButton
                accept=".json,application/json"
                onFileSelected={onFileSelected}
            >
                Upload
            </SelectFileButton>
        </>
    );
};
