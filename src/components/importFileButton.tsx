import { Button } from '@material-ui/core'
import * as React from 'react'

const openFileDialog = (fileInputRef: React.RefObject<HTMLInputElement>): void => {
    const fileInputDomObject = fileInputRef.current
    if (fileInputDomObject) {
        fileInputDomObject.click()
    }
}

export const ImportFileButton = ({
    accept,
    children,
    onFileImported
}: ImportFileButtonProps): JSX.Element => {
    const fileInputRef = React.useRef(null)
    return (
        <>
            <input
                type="file"
                accept={accept}
                ref={fileInputRef}
                multiple={false}
                onChange={(event) => onFileImported(event.target.files)}
                className="hidden-file-input"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => openFileDialog(fileInputRef)}
            >
                {children}
            </Button>
        </>
    )
}

interface ImportFileButtonProps {
    accept: string,
    children: string,
    onFileImported: (file: FileList | null) => void
}
