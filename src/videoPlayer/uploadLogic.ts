import { Playlist } from './playlistTypes'

export const readPlaylistJsonFromFile = async (file: File): Promise<Playlist> => (
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const fileReadResult = reader.result as string
            try {
                const playlistJson = JSON.parse(fileReadResult)
                resolve(playlistJson)
            }
            catch (error) {
                reject(error)
            }
        }
        reader.readAsText(file)
    })
)

// tslint:disable-next-line:no-any
const validateRequiredString = (value: any): boolean => value && typeof value === "string"

export const playlistInValidFormat = (playlist: Playlist): boolean => {
    const { groups, name, options } = playlist

    return Array.isArray(groups)
        && validateRequiredString(name)
        && !!options
        && !!groups.length
        && groups.every((videoGroup) => {
        const { groupName, videos } = videoGroup

        return validateRequiredString(groupName)
            && Array.isArray(videos)
            && !!videos.length
            && videos.every((video) => {
                const { description, title, url } = video

                return validateRequiredString(description)
                    && validateRequiredString(title)
                    && validateRequiredString(url)
            })
    })
}
