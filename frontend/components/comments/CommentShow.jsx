import { Component } from 'react';
import Comment from './Comment';

let getStateFromProps = function (props) {
  var post = PostStore.find(props.params.id);
  var comment = post.comments.find(function (comment) {
    return comment.id == props.params.commentId;
  }, this);

  return { post: post, comment: comment };
};

export default class CommentShow extends Component {

  constructor(props) {
    super(props);
    this.state = getStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setState(getStateFromProps(newProps));
  }

  render() {
    if (!this.state.comment) { return <div></div>; }

    return (
      <Comment
        comment={this.state.comment}
        post={this.state.post}
      />
    );
  }

}
