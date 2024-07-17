import React from 'react';
import PostStore from '../../stores/post_store';
import PostApiUtil from '../../util/post_api_util';
import Comments from '../comments/Comments';
import VoteForm from '../shared/VoteForm';
import CommentForm from '../comments/CommentForm';

let submitterInfo = function (post) {
  return (
    <p className="submitter-info">
      Submitted <abbr
        className="timeago"
        title={post.created_at}>{post.created_at}
      </abbr> by <a className="clickable" href="#">{post.user.username}</a>
    </p>
  );
};

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: PostStore.find(this.props.params.id)
    };
  }

  componentDidMount() {
    this.postListener = PostStore.addListener(this._postsChanged.bind(this));

    let setTimeAgo = function () {
      $("abbr.timeago").timeago();
    }.bind(this);

    if (!this.state.post) {
      PostApiUtil.fetchPost(this.props.params.id, setTimeAgo);
    } else {
      setTimeAgo();
    }
  }

  componentWillUnmount() {
    this.postListener.remove();
  }

  componentWillReceiveProps(newProps) {
    PostApiUtil.fetchPost(newProps.params.id);
  }

  postComments() {
    return this.state.post.comments.filter(comment => {
      return !comment.parent_comment_id;
    });
  }

  comments() {
    let children = this.props.children;

    if (children) {
      return children;
    } else {
      return (
        <div className="post-comments">
          <CommentForm post={this.state.post} hideCancel={true} />
          <Comments post={this.state.post} comments={this.postComments()} />
        </div>
      );
    }
  }

  render() {
    let post = this.state.post;
    if (!post) { return <div></div>; }

    return (
      <div>

        <div className="post-detail">
          <div className="post-detail-left">
            <VoteForm item={post} itemType="Post"/>
          </div>

          <div className="post-detail-right">
            <h3>{post.title}</h3>

            {submitterInfo(post)}

            <div className="post-body">
              <p>{post.body}</p>
            </div>
          </div>

        </div>

        {this.comments()}

      </div>
    );

  }

  _postsChanged() {
    this.setState({
      post: PostStore.find(this.props.params.id)
    });
  }

}
