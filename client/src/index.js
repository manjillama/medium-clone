import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';

import reducers from './reducers';

import createBrowserHistory from "history/createBrowserHistory";
// Pass this as a Router props to share browser history among all ReactDOM.render()
export const history = createBrowserHistory();

export const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
