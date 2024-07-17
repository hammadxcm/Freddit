import React from 'react';
import PostApiUtil from  '../../util/post_api_util';
import CommentApiUtil from  '../../util/comment_api_util';
import ModalActions from  '../../actions/modal_actions';
import PostStore from '../../stores/post_store';
import UserStore from '../../stores/user_store';
import SignInModal from './sign_in_modal/SignInModal';

export default class VoteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: UserStore.currentUser() };
  }

  componentDidMount() {
    this.userListener = UserStore.addListener(this._change.bind(this));
  }

  componentWillUnmount() {
    this.userListener.remove();
  }

  upvote() {
    this.tryVote(1);
  }

  downvote() {
    this.tryVote(-1);
  }

  tryVote(dir) {
    if (this.state.currentUser) {
      this.vote(dir);
    } else {
      ModalActions.receiveModal(<SignInModal/>);
    }
  }

  vote(dir) {
    let apiUtil = this.props.itemType == "Post" ? PostApiUtil : CommentApiUtil;

    if (dir === 1) {
      apiUtil.upvote(this.props.item.id);
    } else {
      apiUtil.downvote(this.props.item.id);
    }
  }

  voteActive(direction, val) {
    let result = "",
        currentUser = this.state.currentUser;

    if (!currentUser) { return result; }

    this.props.item.votes.forEach(vote => {
      if (vote.user_id == currentUser.id && vote.value == val) {
        result = " active-" + direction;
      }
    });

    return result;
  }

  render() {
    let upvoteActive = this.voteActive("up", 1),
        downvoteActive = this.voteActive("down", -1);

    return (
    <div className="post-vote-form">

      <button className="vote-arrow" onClick={this.upvote}>
        <i className={"fa fa-arrow-up" + upvoteActive}></i>
      </button>

      <div className={"votes" + upvoteActive + downvoteActive}>
        { this.props.hideScore ? "" : this.props.item.score }
      </div>

      <button className="vote-arrow" onClick={this.downvote}>
        <i className={"fa fa-arrow-down" + downvoteActive}></i>
      </button>
    </div>
    );
  }

  _change() {
    this.setState({ currentUser: UserStore.currentUser() });
  }

}
