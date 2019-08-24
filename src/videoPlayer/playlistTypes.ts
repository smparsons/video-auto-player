export interface Playlist {
    groups: VideoGroup[]
}

export interface VideoGroup {
    groupId: number
    groupName: string
    videos: Video[]
}

export interface Video {
    description: string
    title: string
    url: string
}
