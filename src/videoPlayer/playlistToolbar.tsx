import { IconButton, Toolbar, Typography } from '@material-ui/core'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import * as React from 'react'

const openFileDialog = (fileInputRef: React.RefObject<HTMLInputElement>): void => {
    const fileInputDomObject = fileInputRef.current
    if (fileInputDomObject) {
        fileInputDomObject.click()
    }
}

export const PlaylistToolbar = ({ onPlaylistUploaded }: PlaylistToolbarProps): JSX.Element => {
    const fileInputRef = React.useRef(null)
    return (
        <div className="playlist-toolbar-wrapper">
            <input
                type="file"
                accept={".json,application/json"}
                ref={fileInputRef}
                multiple={false}
                onChange={(event) => onPlaylistUploaded(event.target.files)}
                className="hidden-file-input"
            />
            <Toolbar className="toolbar">
                <Typography variant="h6">Video AutoPlayer</Typography>
                <div className="toolbar-buttons">
                    <IconButton className="toolbar-button" onClick={() => openFileDialog(fileInputRef)}>
                        <FolderOpenIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </div>
    )
}

interface PlaylistToolbarProps {
    onPlaylistUploaded: (fileList: FileList | null) => void
}
