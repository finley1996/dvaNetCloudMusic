import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Home';
import MusicPlay from './routes/MusicPlay'
import PlayList from './components/playlist';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/playlist" exact component={PlayList} />
        <Route path="/musicplay" exact component={MusicPlay} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
