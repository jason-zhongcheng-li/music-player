import React from 'react';
import { MainLayout } from './layouts/main';
import MediaPlayer from './components/media-player/media-player';

import './App.css';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <MediaPlayer />
      </MainLayout>
    </div>
  );
}

export default App;
