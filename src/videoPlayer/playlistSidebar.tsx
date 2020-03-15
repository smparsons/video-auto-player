import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import * as React from 'react'

import { PlaylistToolbar } from './playlistToolbar'
import { Playlist, Video, VideoGroup } from './playlistTypes'

export const PlaylistSidebar = ({
    playlist,
    onPlaylistUploaded,
    uploadError,
    onVideoSelected,
    currentVideo
}: PlaylistSidebarProps): JSX.Element => {
    const groups = playlist ? playlist.groups : []
    const initialGroupName = groups.length ? groups[0].groupName : false as string | false
    const [currentGroupName, setCurrentGroupName] = React.useState(initialGroupName)

    const mapGroupVideo = (video: Video): JSX.Element => {
        const { title, subtitle } = video
        const baseClass = 'list-item'
        const className = currentVideo && title === currentVideo.title
            ? `${baseClass} selected`
            : baseClass
        return (
            <ListItem
                key={title}
                onClick={() => onVideoSelected(video)}
                className={className}
            >
                <ListItemText primary={title} secondary={subtitle} />
            </ListItem>
        )
    }

    const mapPlaylistGroup = ({ groupName, videos }: VideoGroup): JSX.Element => (
        <ExpansionPanel
            key={groupName}
            className="playlist-video-group"
            expanded={currentGroupName === groupName}
            onChange={(_: React.ChangeEvent<{}>, isExpanded: boolean): void => {
                setCurrentGroupName(isExpanded ? groupName : false)
            }}
        >
            <ExpansionPanelSummary
                aria-controls={`group-${groupName}-content`}
                id={`group-${groupName}-header`}
                expandIcon={<ExpandMore />}
            >
                <Typography>{groupName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List>{videos.map(mapGroupVideo)}</List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

    return (
        <Paper className="playlist-sidebar">
            <PlaylistToolbar onPlaylistUploaded={onPlaylistUploaded} />
            <div className="playlist-content">
                {uploadError
                    ? <Typography className="upload-error">{uploadError}</Typography>
                    : groups.map(mapPlaylistGroup)}
            </div>
        </Paper>
    )
}

interface PlaylistSidebarProps {
    playlist: Playlist | null
    onPlaylistUploaded: (fileList: FileList | null) => void
    uploadError: string | null
    onVideoSelected: (video: Video) => void
    currentVideo: Video | null
}
