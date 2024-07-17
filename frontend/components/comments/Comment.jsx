import React from 'react';
import ModalActions from '../../actions/modal_actions';
import CommentApiUtil from '../../util/comment_api_util';
import UserStore from '../../stores/user_store';
import PostStore from '../../stores/post_store';
import Comments from './Comments';
import CommentForm from './CommentForm';
import CommentBody from './CommentBody';
import SignInModal from '../shared/sign_in_modal/SignInModal';
import VoteForm from '../shared/VoteForm';

export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      currentUser: UserStore.currentUser()
    };
  }

  componentDidMount() {
    this.userListener = UserStore.addListener(this._usersChanged.bind(this));
  }

  componentWillUnmount() {
  this.userListener.remove();
  }

  _usersChanged() {
    this.setState({ currentUser: UserStore.currentUser() });
  }

  childComments() {
    let parentComment = this.props.comment,
        post = PostStore.find(parentComment.post_id);

    return post.comments.filter(comment => {
      return comment.parent_comment_id === parentComment.id;
    });

  }

  toggleForm() {
    if (UserStore.currentUser()) {
      this.setState({ showForm: !this.state.showForm });
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  }

  deleteButton() {
    let currentUser = this.state.currentUser;
    if (currentUser && currentUser.id == this.props.comment.user_id) {
      return <button onClick={this.deleteComment}>delete</button>;
    }
  }

  deleteComment(e) {
    CommentApiUtil.destroyComment(this.props.comment.id);
  }

  commentForm() {
    if (this.state.showForm) {
      return (
        <CommentForm
          toggleForm={this.toggleForm}
          parentComment={this.props.comment}
          post={this.props.post} />
      );
    }
  }

  render() {
    let comment = this.props.comment,
        commentClass = this.props.commentClass == "even" ? "odd" : "even";

    return (
      <div className={"comment " + commentClass}>
        <li>

          <div className="comment-row">
            <VoteForm item={comment} itemType="Comment" hideScore={true}/>
            <CommentBody comment={comment} />
          </div>

          <button onClick={this.toggleForm}>reply</button>
          {this.deleteButton()}
          {this.commentForm()}
          <Comments
            commentClass={commentClass}
            comments={this.childComments()}
            post={this.props.post}
            />
        </li>
      </div>
    );
  }

}
