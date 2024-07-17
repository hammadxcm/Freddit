import React from 'react';
import PostApiUtil from '../../util/post_api_util';
import PostStore from '../../stores/post_store';
import NavBar from '../navbar/NavBar';
import SortingTabs from '../navbar/SortingTabs';
import Posts from '../posts/Posts';
import SideBar from '../shared/SideBar';

let getStateFromStore = function () {
  return { posts: PostStore.all() };
};

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: null };
  }

  componentDidMount() {
    this.postListener = PostStore.addListener(this._postsChanged.bind(this));
    PostApiUtil.fetchAllPosts(this.state.params);
  }

  componentWillUnmount() {
    this.postListener.remove();
  }

  _postsChanged() {
    this.setState(getStateFromStore());
  }

  render() {
    let body,
        url = "#";
    if (this.props.children) {
      body = this.props.children;
    } else {
      if (this.state.posts) {
        body = <Posts posts={this.state.posts} showSub={true}/>;
      } else {
        body = <img className="spinner" src={window.fredditAssests.spinner}/>;
      }
    }

    return (
      <div>

        <NavBar
          subName={"all"}
          tabs={<SortingTabs
            url={url}
            sort={this.props.sort} />}
        />

        <div className="main-content">
          {body}
        </div>

        <SideBar
          history={this.props.history}
          sub={this.state.sub}
        />

      </div>
    );
  }

}
