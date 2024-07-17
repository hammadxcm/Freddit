import React from 'react';
import CommentApiUtil from '../../util/comment_api_util';
import UserStore from '../../stores/user_store';

export default class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { body: "", currentUser: UserStore.currentUser() };
  }

  componentDidMount() {
    this.userListener = UserStore.addListener(this._usersChanged.bind(this));
  }

  handleBodyChange(e) {
    this.setState({ body: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var comment = {
      body: this.state.body,
      post_id: this.props.post.id,
      parent_comment_id: this.props.parentComment && this.props.parentComment.id
    };

    CommentApiUtil.createComment(comment, () => {
      this.setState({ body: "" });
      this.props.toggleForm && this.props.toggleForm();
    });
  }

  cancelButton() {
    if (!this.props.hideCancel) {
      return <button onClick={this.props.toggleForm}>Cancel</button>;
    }
  }

  render() {
    if (!this.state.currentUser) { return <div></div>; }

    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <textarea onChange={this.handleBodyChange} value={this.state.body}/>
        <div className="comment-buttons">
          <button>Submit</button>
          {this.cancelButton()}
        </div>
      </form>
    );
  }

  _usersChanged() {
    this.setState({ currentUser: UserStore.currentUser() });
  }

}
