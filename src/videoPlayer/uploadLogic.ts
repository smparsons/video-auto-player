import { Playlist } from './playlistTypes'

export const readPlaylistJsonFromFile = (file: File): Promise<Playlist> => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
        const fileReadResult = reader.result as string
        const playlistJson = JSON.parse(fileReadResult)
        resolve(playlistJson)
    }
    reader.readAsText(file)
})

// tslint:disable-next-line:no-any
const validateRequiredString = (value: any): boolean => value && typeof value === "string"

export const playlistInValidFormat = (playlist: Playlist): boolean => {
    const { groups, name, options } = playlist

    return Array.isArray(groups)
        && validateRequiredString(name)
        && !!options
        && groups.every((videoGroup) => {
        const { groupId, groupName, videos } = videoGroup

        return Number.isInteger(groupId)
            && validateRequiredString(groupName)
            && Array.isArray(videos) && videos.every((video) => {
                const { description, title, url, videoId } = video

                return validateRequiredString(description)
                    && validateRequiredString(title)
                    && validateRequiredString(url)
                    && Number.isInteger(videoId)
            })
    })
}
