import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import postConstants from '../constants/post_constants';

let _posts = {};
const postStore = new Store(AppDispatcher);

const addPosts = function (posts) {
  _posts = {};
  posts.forEach(post => {
    _posts[post.sub_id] = _posts[post.sub_id] || [];
    _posts[post.sub_id].push(post);
  });
};

const replacePost = function (newPost) {
  let posts = _posts[newPost.sub_id] || [];
  let replaced = false;

  let newPosts = posts.map(post => {
    if (post.id == newPost.id) {
      replaced = true;
      return newPost;
    } else {
      return post;
    }
  });

  if (!replaced) {
    newPosts.push(newPost);
  }
  _posts[newPost.sub_id] = newPosts;
};

const addComment = function (comment) {
  let post = postStore.find(comment.post_id);
  if (post) {
    let index;

    post.comments.find((oldComment, idx) => {
      if (comment.id == oldComment.id) {
        index = idx;
        return true;
      }
    });

    if (index) {
      post.comments[index] = comment;
    } else {
      post.comments.unshift(comment);
    }
  }
};

const removeComment = function (comment) {
  let post = postStore.find(comment.post_id);

  if (post) {
    let index;

    post.comments.find((oldComment, idx) => {
      if (comment.id == oldComment.id) {
        index = idx;
        return true;
      }
    });

    post.comments.splice(index, 1);
  }
};


postStore.all = function (sortBy) {
  let posts = [];

  let keys = Object.keys(_posts);
  for (let idx = 0; idx < keys.length; idx++) {
    posts = posts.concat(_posts[keys[idx]]);
  }

  return posts.slice();
};

postStore.find = function (id) {
  return postStore.all().find((post) => {
    return post.id == id;
  });
};

postStore.findBySub = function (id) {
  let posts = _posts[id] || [];

  return posts.slice();
};

postStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case postConstants.RECEIVE_POSTS:
      addPosts(payload.posts);
      postStore.__emitChange();
      break;
    case postConstants.RECEIVE_SUB_POSTS:
      _posts[payload.subId] = payload.posts;
      postStore.__emitChange();
      break;
    case postConstants.RECEIVE_POST:
      replacePost(payload.post);
      postStore.__emitChange();
      break;
    case postConstants.RECEIVE_COMMENT:
      addComment(payload.comment);
      postStore.__emitChange();
      break;
    case postConstants.DELETE_COMMENT:
      removeComment(payload.comment);
      postStore.__emitChange();
      break;
  }
};

export default postStore;
