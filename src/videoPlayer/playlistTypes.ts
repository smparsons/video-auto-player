export interface Playlist {
    groups: VideoGroup[],
    name: string,
    options: PlaylistOptions
}

export interface PlaylistOptions {
    autoFullscreen?: boolean
}

export interface VideoGroup {
    groupId: number
    groupName: string
    videos: Video[]
}

export interface Video {
    videoId: number
    description: string
    title: string
    subtitle: string
    url: string
}
