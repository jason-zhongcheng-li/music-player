# Music Player

![](https://img.shields.io/node/v/mocha)

## Front end Project

Typescript + React

## Requirements
Use the iTunes affiliate API to develop a simple music player that lets you search by artist and displays the search results on screen. When a song is selected from the list, the song will start to play.

### Mobile View

1. [X] Each song’s title, artist, album and album art should be displayed.
2. [X] When we tap a song, a media player should show up at the bottom of the screen and
start to play the preview for that song. The media player may be something as simple as a toggling play or pause button, however, it should pop-up at the bottom of the screen and on top of the list as shown. All the other controls shown are optional.
3. [X] The media player should only show once a song is clicked and should stay on the screen from that point onwards and should be reused for any subsequent song played.
4. [X] When a song is being played, you must provide some indicator in the list item that the song is being played.
5. [X] You can stop playback if a new search is performed, however the preference is for the song to keep playing.
6. [ ] If you stop playback when a new search is performed, you must hide the media player till a song is selected.
7. [X] You can take liberties with the UI, however the major elements as shown in the picture or mentioned above should still be present.

### Desktop View

1. [X] Each song’s title, artist, album and album art should be displayed.
2. [X] When a song is selected on desktop, the screen should split and on the right hand side
we should see the album art (large image) and music controls.
3. [X] The selected song’s preview should not play automatically, it should simply display the
details and let to user play the song preview if they wish.
4. [X] Below the music controls, all the songs in the album should be listed. These only need to
be listed and don’t have to be playable.
5. [X] The music control only needs to have play and pause however the music should keep playing even if a different song is selected on the left hand side.
6. [X] If a song is playing and a different song is selected from the left hand side, the song should keep playing, however the right hand side should display details for the song selected.
7. [X] There should be some visual indication on the song playing.
8. [X] Below is an example of what the screen should look like. You can take liberties with the
UI, however all the major components shown should be present on the screen.
9. [X] You can stop playback if a new search is performed, however the preference is for the
song to keep playing.
10. [X] If you stop playback when a new search is performed, you must hide the media player till
a song is selected.

## Installation
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies in the project.

```bash
npm install
```

## Configuration

Some of the functions in this project need to talk to iTunes API via REST

1. Create a *.env* file at the root directory of the application and add the variables to it.
2. Variables

```
REACT_APP_ITUNES_API_SEARCH_URL=https://itunes.apple.com/search?
REACT_APP_ITUNES_API_LOOKUP_URL=https://itunes.apple.com/lookup?
```

>Note: No space and No punctuation

## Run
In the project directory, you can run:
```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Supported Browsers
1. [X] Chrome
2. [X] Firefox
3. [X] Safari


<br>
<br>

# Author

* Jason Li - [LinkedIn](https://www.linkedin.com/in/jason-li-5a943a135/)
* Full stack Developer (Typecript, ReactJS, Node, NextJS, Express, GraphQL)