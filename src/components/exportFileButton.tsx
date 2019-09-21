import { Button } from '@material-ui/core'
import * as React from 'react'

const exportFile = (name: string, content: string): void => {
    const link = document.createElement('a')
    const splitFileName = name.split('.')
    const extension = splitFileName[splitFileName.length - 1]
    link.href = URL.createObjectURL( new Blob([content], {
        type: `text/${extension === 'txt' ? 'plain' : extension}`
    }))
    link.download = name
    link.click()
}

export const ExportFileButton = ({ content, name, children }: ExportFileButtonProps): JSX.Element => (
    <Button
        variant="contained"
        color="primary"
        onClick={() => exportFile(name, content)}
    >
        {children}
    </Button>
)

interface ExportFileButtonProps {
    content: string,
    name: string,
    children: string
}
