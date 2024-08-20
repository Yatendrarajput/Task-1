# Music Player Project

This is a React-based Music Player project that allows users to browse and play songs, with features like search, controls for playback, and more. The application uses Context API for state management and is styled with Tailwind CSS.

## Features

- **Song List**: Browse a list of songs with the option to filter by "For You" and "Top Tracks".
- **Search Functionality**: Search for songs or artists in real-time.
- **Playback Controls**: Play, pause, skip tracks, and adjust the volume.
- **Responsive Design**: The layout adapts to different screen sizes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yatendrarajput/Task-1.git
   ```
2. Navigate to the project directory:
   ```bash
   cd client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Demo

You can view the deployed project [here](https://vercel.com/yatendrarajputs-projects/task-1-xthy/FTepNZrHLFL2nor6zpY6hiAFyoeQ).

## Components

### HomePage.js

The `HomePage` component is the main layout of the application. It includes the logo, the song list, and the controls. The layout is responsive and adapts to different screen sizes.

### Controls.js

The `Controls` component provides playback controls, including play/pause, next/previous track, and volume control. It also displays the current song and artist, and includes a timeline for tracking song progress.

### SongList.js

The `SongList` component displays a list of songs. Users can filter by "For You" or "Top Tracks", search for songs, and click to play a song. The list is responsive and adapts to different screen sizes.

### UserContext.js & UserContextProvider.js

`UserContext.js` defines and exports the context using `React.createContext`. `UserContextProvider.js` manages the state for the song array, audio, current song index, and the current song. It also fetches song data from a URL and automatically plays the audio when set.

## Styling

The project uses Tailwind CSS for styling. The layout is designed to be responsive and adapts to different screen sizes.

## Future Enhancements

- Integrate more advanced search and filtering options.
- Improve responsive UI/UX with additional features.

## Contact

For any inquiries or contributions, please reach out via [rajputyatendra1011@gmail.com](mailto:rajputyatendra1011@gmail.com).
