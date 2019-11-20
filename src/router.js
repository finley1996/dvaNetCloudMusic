import React from 'react';
import { Router, Route, Switch, IndexRedirect } from 'dva/router';
import IndexPage from './routes/Home';
import MusicPlay from './routes/MusicPlay'
import PlayList from './components/playlist';
import DJCateList from "./components/catelist"
import DJs from "./components/djs"
import DJDetails from "./components/djDetails"
import Vidioplay from './routes/PlayVideo'
import Recommend from './components/recommend'
import Listview from './components/liveview'
import SearchPage from "./components/searchPage"
import RadioPage from "./components/radio"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={IndexPage} />
        {/* <Route path="/" exact component={IndexPage} remder={() => {
          return (
            <IndexPage>
              <Route path="/recommend" component={Recommend} />
              <Route path="/search" component={SearchPage} />
              <Route path="/dj" component={RadioPage} />
              <Route path="/mv" component={Listview} />
            </IndexPage>
          )
        }} /> */}
        {/* <IndexRedirect to='/recommend' />
          <Route path="/recommend" component={Recommend} />
          <Route path="/search" component={SearchPage} />
          <Route path="/dj" component={RadioPage} />
          <Route path="/mv" component={Listview} />
        </Route> */}
        <Route path="/musicplay" exact component={MusicPlay} />
        <Route path="/playlist" exact component={PlayList} />
        <Route path="/djcatelist" exact component={DJCateList} />
        <Route path="/djcatelist/djs/details"
          component={DJDetails} />
        <Route path="/djcatelist/djs" component={DJs} />
        <Route path="/mvdetail" exact component={Vidioplay} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

