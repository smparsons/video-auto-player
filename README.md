# Video AutoPlayer

A simple tool that I wrote which allows me to autoplay a list of online videos. To use the player, the user first needs to import a JSON file which contains a list of the online videos. The player will then interpret the JSON file and display a simple UI which allows the user to select which video to watch. After a video is finished playing, the UI will automatically play the next video in the playlist.

## Required JSON Strutcture

Here is an example that illustrates the expected structure of an imported JSON files:

```json
{
    "name": "Trains",
    "options": {
        "autoFullscreen": true
    },
    "groups": [
        {
            "groupName": "Trains Compilation",
            "videos": [
                {
                    "description": "This is my first video, it is cool!",
                    "title": "Trains Video 1",
                    "subtitle": "Trains are Cool",
                    "url": "https:\/\/example.com\/videos\/episode1.mp4"
                },
                {
                    "description": "This is yet another video, it is even cooler!",
                    "title": "Trains Video 2",
                    "subtitle": "Trains are even Cooler",
                    "url": "https:\/\/example.com\/videos\/episode2.mp4"
                },
                {
                    "description": "This is my final video, it is the coolest!",
                    "title": "Trains Video 3",
                    "subtitle": "Trains are the Coolest!",
                    "url": "https:\/\/example.com\/videos\/episode3.mp4"
                }
            ]
        }
    ]
}
```

At the top level, the JSON is required to have:

1. A name
2. An options object (just leave it empty if you don't want to set any options)
3. An array of groups

The groups array is required to have at least one group. Where each group is required to have:

1. A group name
2. An array of videos

The videos array is required to have at least one video. Where each video is required to have:

1. A description
2. A title
3. A url

## Playlist Options

The options object at the top of the JSON file can optionally have the following fields:

1. **autoFullScreen** - If set to true, the video will automatically fill the entire browser viewport when it starts playing. If you want the video to be truly fullscreen, you'll have to set your browser to fullscreen mode. 

## Possible Enhancements

1. Don't make the requirements for the JSON so strict. I shouldn't have to specify at least one group if I don't want to. I shouldn't have to set a video description either.
2. Add more options. Such as the ability to turn off autoplay if desired.
3. Store recently imported playlists. I was working on a feature like this but I ended up removing it since I don't really need this feature. However, in the future it may be nice to add it back.