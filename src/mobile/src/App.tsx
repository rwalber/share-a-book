import React from 'react';
import Navigation from './components/Navigation';
import GlobalContext from './contexts/Global';

const App = () => {
  return (
    <GlobalContext>
      <Navigation />
    </GlobalContext>
  );
};

export default App;