import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Home';
import MusicPlay from './routes/MusicPlay'
import Vidioplay from './routes/PlayVideo'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/musicplay" exact component={MusicPlay} />
        <Route path="/mvdetail" exact component={Vidioplay} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
