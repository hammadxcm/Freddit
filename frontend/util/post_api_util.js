import postActions from '../actions/post_actions';

const postApiUtil = {

  fetchSubPosts: function(subId){
    $.ajax({
      method: "GET",
      url: "/api/subs/" + subId + "/posts",
      success: posts => postActions.receiveAll(posts)
    });
  },

  fetchAllPosts: function(data){
    data = data || {};
    $.ajax({
      method: "GET",
      url: "/api/posts",
      data: data,
      success: posts => postActions.receiveAll(posts)
    });
  },

  fetchPost: function(postId, cb){
    $.ajax({
      method: "GET",
      url: "/api/posts/" + postId,
      success: post => {
        postActions.receivePost(post);
        cb && cb();
      }
    });
  },

  createPost: function(post, cb){
    $.ajax({
      method: "POST",
      url: "/api/posts/",
      data: { post: post },
      success: post => {
        postActions.receivePost(post);
        cb && cb();
      }
    });
  },

  upvote: function(postId){
    $.ajax({
      method: "POST",
      url: "/api/posts/" + postId + "/upvote",
      success: post => postActions.receivePost(post)
    });
  },

  downvote: function(postId){
    $.ajax({
      method: "POST",
      url: "/api/posts/" + postId + "/downvote",
      success: function (post) {
        postActions.receivePost(post);
      }
    });
  }
};

export default postApiUtil;
