import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import Store from './stateManagement/Store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(  <Provider store={Store}><App /></Provider>, div);
});
