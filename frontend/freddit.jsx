import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import SubNew from './components/subs/SubNew';
import SubHot from './components/subs/SubHot';
import SubTop from './components/subs/SubTop';
import SubControversial from './components/subs/SubControversial';
import FrontPageTop from './components/frontpage/FrontPageTop';
import FrontPageHot from './components/frontpage/FrontPageHot';
import FrontPageNew from './components/frontpage/FrontPageNew';
import FrontPageControversial from './components/frontpage/FrontPageControversial';
import Post from './components/posts/Post';
import CommentShow from './components/comments/CommentShow';
import PostForm from './components/posts/PostForm';

let _scrollToTop = function () {
  window.scrollTo(0, 0);
};

let _checkForSignedIn = function (state, replace, callback) {
  if (UserStore.currentUser()) {
    callback();
  } else {
    UserApiUtil.fetchCurrentUser(function () {
      callback();
    });
  }

};

let routes = (
  <Router history={browserHistory} onUpdate={_scrollToTop}>
    <Route path="/" component={App} >
      <IndexRoute component={FrontPageHot}/>
      <Route path="new" component={FrontPageNew}/>
      <Route path="hot" component={FrontPageHot}/>
      <Route path="top" component={FrontPageTop}/>
      <Route path="submit" component={PostForm}/>
      <Route path="controversial" component={FrontPageControversial}/>
      <Route path="r/:subName/new" component={SubNew}/>
      <Route path="r/:subName/hot" component={SubHot}/>
      <Route path="r/:subName/top" component={SubTop}/>
      <Route path="r/:subName/controversial" component={SubControversial}/>
      <Route path="r/:subName" component={SubHot}>
        <Route path="submit" component={PostForm}/>
        <Route path=":id" component={Post}>
          <Route path="comments/:commentId" component={CommentShow}/>
        </Route>
      </Route>
    </Route>
  </Router>
);

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

$(function () {
  let root = document.getElementById('content');
  ReactDOM.render(routes, root);
});
