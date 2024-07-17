import React from 'react';

class Comments extends React.Component {

  render() {
    let comments = this.props.comments.map(comment => {
        return (
          <Comment
            commentClass={this.props.commentClass}
            comment={comment}
            post={this.props.post}
            key={comment.id}/>
        );
    });

    return (
      <div>
        <ul className="comments">
          {comments}
        </ul>
    </div>
    );
  }

}

import Comment from './Comment';
export default Comments;
