import React from 'react';
import './App.css';

import { Provider } from "react-redux";
import configureStore from "./store";

import Team from './Team/Team';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Team />
      </div>
    </Provider>
  );
}

export default App;
