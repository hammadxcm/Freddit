import AppDispatcher from '../dispatcher/dispatcher';
import PostConstants from '../constants/post_constants';

let PostActions = {
  receiveAll: function(posts){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POSTS,
      posts: posts
    });
  },
  receiveSubPosts: function(posts, subId){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_SUB_POSTS,
      posts: posts,
      subId: subId
    });
  },

  receivePost: function(post){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POST,
      post: post
    });
  },

  receiveComment: function(comment){
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_COMMENT,
      comment: comment
    });
  },

  deleteComment: function(comment){
    AppDispatcher.dispatch({
      actionType: PostConstants.DELETE_COMMENT,
      comment: comment
    });
  },
};

module.exports = PostActions;
