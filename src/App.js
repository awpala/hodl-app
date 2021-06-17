import React from 'react';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import Home from './views/Home';
import './App.scss';

const App = () => {
  const store = createStore(rootReducer, devToolsEnhancer());

  return (
    <div className='App' data-testid='App'>
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
