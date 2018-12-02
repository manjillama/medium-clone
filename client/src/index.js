import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';

import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
