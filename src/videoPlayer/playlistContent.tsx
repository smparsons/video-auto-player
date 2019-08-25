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

import { Playlist, Video, VideoGroup } from './playlistTypes'

export const PlaylistContent = ({ playlist, currentVideo, onVideoSelected }: PlaylistContentProps): JSX.Element => {
    const { groups } = playlist
    const initialGroupId = groups[0].groupId as number | false
    const [currentGroupId, setCurrentGroupId] = React.useState(initialGroupId)

    const mapGroupVideo = (video: Video): JSX.Element => {
        const { title, subtitle, videoId } = video
        const baseClass = 'playlist-video-item'
        const className = currentVideo && videoId === currentVideo.videoId
            ? `${baseClass} selected`
            : baseClass
        return (
            <ListItem
                key={videoId}
                onClick={() => onVideoSelected(video)}
                className={className}
            >
                <ListItemText primary={title} secondary={subtitle} />
            </ListItem>
        )
    }

    const mapPlaylistGroup = ({ groupId, groupName, videos }: VideoGroup): JSX.Element => (
        <ExpansionPanel
            key={groupId}
            expanded={currentGroupId === groupId}
            onChange={(_: React.ChangeEvent<{}>, isExpanded: boolean): void => {
                setCurrentGroupId(isExpanded ? groupId : false)
            }}
        >
            <ExpansionPanelSummary
                aria-controls={`group-${groupId}-content`}
                id={`group-${groupId}-header`}
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
        <Paper className="video-player-section playlist">
            {groups.map(mapPlaylistGroup)}
        </Paper>
    )
}

interface PlaylistContentProps {
    playlist: Playlist,
    currentVideo: Video | null,
    onVideoSelected: (video: Video) => void
}
