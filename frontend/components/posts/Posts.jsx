import React from 'react';
import PostPreview from './PostPreview';

export default class Posts extends React.Component {

  render() {
    let posts = (
      this.props.posts.map(post => {
        return (
          <PostPreview
            showSub={this.props.showSub}
            key={post.id }
            post={post}
          />
        );
      })
    );

    return (
      <div>
        <ul>
          {posts}
        </ul>
      </div>
    );
  }

}
