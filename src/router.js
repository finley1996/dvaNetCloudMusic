import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Home';
import MusicPlay from './routes/MusicPlay'
import PlayList from './components/playlist';
import DJCateList from "./components/catelist"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/playlist" exact component={PlayList} />
        <Route path="/musicplay" exact component={MusicPlay} />
        <Route path="/djcatelist" exact component={DJCateList} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
