import { Button } from '@material-ui/core'
import * as React from 'react'

const selectFile = (fileInputRef: React.RefObject<HTMLInputElement>): void => {
    const fileInputDomObject = fileInputRef.current
    if (fileInputDomObject) {
        fileInputDomObject.click()
    }
}

export const SelectFileButton = ({
    accept,
    children,
    onFileSelected
}: SelectFileButtonProps): JSX.Element => {
    const fileInputRef = React.useRef(null)
    return (
        <>
            <input
                type="file"
                accept={accept}
                ref={fileInputRef}
                multiple={false}
                onChange={(event) => onFileSelected(event.target.files)}
                className="hidden-file-input"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => selectFile(fileInputRef)}
            >
                {children}
            </Button>
        </>
    )
}

interface SelectFileButtonProps {
    accept: string,
    children: string,
    onFileSelected: (file: FileList | null) => void
}
