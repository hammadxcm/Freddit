import React from 'react';
import VoteForm from '../shared/VoteForm';

export default class PostPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showPreview: false };
  }

  componentDidMount() {
    jQuery("abbr.timeago").timeago();
  }

  subInfo() {
    let subUrl = this.subUrl();

    if (this.props.showSub) {
      return (
        <span> to: <a className="clickable" href={subUrl}>{subUrl.slice(1)}</a></span>
      );
    }
  }

  subUrl() {
    let subName = this.props.post.sub.title;
    return" #/r/" + subName;
  }

  togglePreview() {
    this.setState({ showPreview: !this.state.showPreview });
  }

  postPreview() {
    if (this.state.showPreview) {
      return (
        <p className="preview">
          {this.props.post.body}
        </p>
      );
    }
  }

  render() {
    let post = this.props.post,
        sub = post.sub,
        postUrl = this.subUrl() + "/" + post.id;

    return (
      <li className="post-preview">

        <div className="post-preview-left">
          <VoteForm item={post} itemType="Post"/>
        </div>

        <div className="post-preview-right">
          <h4>
            <a className="clickable" href={postUrl}>{post.title}</a>
          </h4>
          <p>
            Submitted <abbr
              className="timeago"
              title={post.created_at}>{post.created_at}
            </abbr> by <a className="clickable" href="#">{post.user.username}</a>
            {this.subInfo()}
          </p>
          <p>
            <button
              className="clickable"
              onClick={this.togglePreview.bind(this)}
            >Preview</button>
            <a
              className="clickable"
              href={postUrl}
            >{post.comments.length} comments</a>
          </p>
          {this.postPreview()}
        </div>

      </li>
    );
  }

}
