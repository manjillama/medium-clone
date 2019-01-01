import React from 'react';
import ReactDOM from 'react-dom';
/*
* Switch
  - https://stackoverflow.com/questions/32128978/react-router-no-not-found-route
* Router
  - https://stackoverflow.com/questions/42223794/multiple-reactdom-render-calls-with-shared-router-context
*/
import { Router, Route , Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import Home from './components/site/home/Home';
import Topic from './components/site/Topic';

import Contact from './components/site/Contact';
import Settings from './components/site/users/Settings';
import Profile from './components/site/users/profile/Profile';
import ProfileEdit from './components/site/users/profile/ProfileEdit';
import WriteStory from './components/site/users/story/writeStory/WriteStory';
import Stories from './components/site/users/story/Stories';
import ReadStory from './components/site/ReadStory';

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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/topic/:topic" component={Topic} />

          <Route exact path="/@:username/:storyId" component={ReadStory} />

          <Route exact path="/new-story" component={WriteStory} />
          <Route exact path="/p/:postId/edit" component={WriteStory} />
          <Route exact path="/me/stories/:id" component={Stories} />

          <Route exact path="/me/settings" component={Settings} />
          <Route exact path="/@:username" component={Profile} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route render={()=> <h1>Page Not Found :(</h1>}/>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
