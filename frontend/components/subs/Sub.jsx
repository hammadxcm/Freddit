import React from 'react';
import NavBar from '../navbar/NavBar';
import Posts from '../posts/Posts';
import SideBar from '../shared/SideBar';
import SortingTabs from '../navbar/SortingTabs';
import PostStore from '../../stores/post_store';
import SubStore from '../../stores/sub_store';
import SubApiUtil from '../../util/sub_api_util';

let getStateFromStore = function (props) {
  let sub = SubStore.findByName(props.params.subName),
      posts;

  if (sub) { posts = PostStore.findBySub(sub.id); }

  return { sub: sub, posts: posts };
};

export default class Sub extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore(this.props);
  }

  componentDidMount() {
    this.postListener = PostStore.addListener(this._postsChanged.bind(this));
    SubApiUtil.fetchSub(this.props.params.subName);
  }

  componentWillUnmount() {
    this.postListener.remove();
  }

  componentWillReceiveProps(newProps) {
    this.setState(getStateFromStore(newProps));
    SubApiUtil.fetchSub(newProps.params.subName);
  }

  _postsChanged() {
    this.setState(getStateFromStore(this.props));
  }

  posts() {
    if (this.state.posts && this.state.posts.length > 0) {
      return <Posts posts={this.state.posts} showSub={false}/>;
    } else {
      return <img className="spinner" src={window.fredditAssests.spinner}/>;
    }
  }

  body() {
    if (this.props.children) { return this.props.children; }
    return (
      <div>
        {this.posts()}
        <SideBar history={this.props.history} sub={this.state.sub}/>
      </div>
    );
  }

  render() {
    let url = "#r/" + this.props.params.subName,
        imageUrl = this.state.sub && this.state.sub.imageUrl;
        
    return (
      <div>

        <NavBar
          imageUrl={imageUrl}
          subName={this.props.params.subName}
          tabs={<SortingTabs url={url}
          sort={this.props.sort} />}
        />

        <div className="main-content">
          {this.body()}
        </div>

      </div>
    );
  }

}
