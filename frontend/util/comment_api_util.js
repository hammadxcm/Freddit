import PostActions from '../actions/post_actions';

const commentApiUtil = {

  createComment: function(comment, cb){
    $.ajax({
      method: "POST",
      url: "/api/comments/",
      data: {comment: comment},
      success: comment => {
        PostActions.receiveComment(comment);
        cb && cb();
      }
    });
  },

  destroyComment: function(id){
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id,
      success: comment => PostActions.deleteComment(comment)
    });
  },

  upvote: function(commentId){
    $.ajax({
      method: "POST",
      url: "/api/comments/" + commentId + "/upvote",
      success: comment => PostActions.receiveComment(comment)
    });
  },

  downvote: function(commentId){
    $.ajax({
      method: "POST",
      url: "/api/comments/" + commentId + "/downvote",
      success: comment => PostActions.receiveComment(comment)
    });
  }

};

export default commentApiUtil;
