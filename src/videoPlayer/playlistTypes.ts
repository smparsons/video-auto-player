export interface Playlist {
    groups: VideoGroup[]
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
