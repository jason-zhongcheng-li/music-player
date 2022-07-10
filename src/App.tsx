import React from 'react';
import { MainLayout } from './layouts/main';
import MediaPlayer from './components/media-player/media-player';
import { AppProvider } from './contexts/AppProvider';

import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <MainLayout>
          <MediaPlayer />
        </MainLayout>
      </div>
    </AppProvider>
  );
}

export default App;
