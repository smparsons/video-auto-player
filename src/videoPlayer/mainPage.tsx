import Button from '@material-ui/core/Button'
import * as React from 'react'

export const MainPage = (): JSX.Element => (
    <div>
        <span>This is my main page</span>
        <div>
            <span>This is a button:</span>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </div>
    </div>
)
