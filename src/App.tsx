import React from 'react';
import { MainLayout } from './layouts/main';
import { AppProvider } from './components/app-provider/app-provider';
import MediaPlayer from './components/media-player/media-player';

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
