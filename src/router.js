import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/Home';
import MusicPlay from './routes/MusicPlay'
import PlayList from './components/playlist';
import DJCateList from "./components/catelist"
import DJs from "./components/djs"
import DJDetails from "./components/djDetails"
import Vidioplay from './routes/PlayVideo'
import BoutiquePage from "./components/BoutiquePage"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/djcatelist/djs/details" component={DJDetails} />
        <Route path="/djcatelist/djs" component={DJs} />
        <Route path="/djcatelist" exact component={DJCateList} />
        <Route path="/" exact component={IndexPage} />
        <Route path="/musicplay" exact component={MusicPlay} />
        <Route path="/playlist" exact component={PlayList} />
        <Route path="/mvdetail" exact component={Vidioplay} />
        <Route path="/BoutiquePage" exact component={BoutiquePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

