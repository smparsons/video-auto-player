export interface Playlist {
    groups: VideoGroup[],
    name: string,
    options: PlaylistOptions
}

export interface PlaylistOptions {
    autoFullscreen?: boolean
}

export interface VideoGroup {
    groupName: string
    videos: Video[]
}

export interface Video {
    description: string
    title: string
    subtitle: string
    url: string
}
