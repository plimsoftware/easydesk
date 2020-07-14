import React from 'react';
import { Router } from 'react-router-dom';

import Header from './components/Header';
import Routes from './routes/index';
import history from './services/history';
import GlobalStyle from './styles/GlobalStyles';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
      </Router>
    </div>
  );
}

export default App;
