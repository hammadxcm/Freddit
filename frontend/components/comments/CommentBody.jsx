import React from 'react';

export default class CommentBody extends React.Component {

  componentDidMount() {

    var setTimeAgo = function () {
      $("abbr.timeago").timeago();
    }.bind(this);

  }

  render() {
    var comment = this.props.comment;

    return (
      <div className="comment-body">
        <p>
          <a href="#" className="clickable">
            {comment.user.username}
          </a>
          <span>
            {" " + comment.score + " points "}
            <abbr
              className="timeago"
              title={comment.created_at}
            >
              {comment.created_at}
            </abbr>
          </span>
        </p>
        <p>{comment.body}</p>
      </div>
    );
  }

}
