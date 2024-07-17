import SubActions from '../actions/sub_actions';
import PostActions from '../actions/post_actions';

const subApiUtil = {

  fetchSubs: function(){
    $.ajax({
      method: "GET",
      url: "/api/subs",
      success: subs => {
        SubActions.receiveAll(subs);
      }
    });
  },

  fetchSub: function(subName, data){
    data = data || {};

    $.ajax({
      method: "GET",
      data: data,
      url: "/api/subs/" + subName,
      success: sub => {
        SubActions.receiveSub(sub);
        PostActions.receiveSubPosts(sub.posts, sub.id);
      }
    });
  }

};

export default subApiUtil;
