import React from 'react';
import PostStore from '../../stores/post_store';
import SubStore from '../../stores/sub_store';
import PostApiUtil from '../../util/post_api_util';

export default class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      sub: SubStore.findByName(this.props.params.subName)
    };
  }

  componentDidMount() {
    this.subListener = SubStore.addListener(this._subsChanged);
    if (!this.state.sub) {
      SubApiUtil.fetchSub(this.props.params.subName);
    }
  }

  componentWillUnmount() {
    this.subListener.remove();
  }

  handleTitleChange(e) {
    this.setState({title: e.currentTarget.value});
  }

  handleBodyChange(e) {
    this.setState({body: e.currentTarget.value});
  }

  handleSubChange(e) {

  }

  handleSubmit(e) {
    e.preventDefault();

    PostApiUtil.createPost({
      title: this.state.title,
      body: this.state.body,
      sub_id: this.state.sub.id
    }, () => {
      this.props.history.push("/r/" + this.state.sub.title);
    });
  }

  render() {
    let sub = this.state.sub,
        subName = sub ? sub.title : "";

    return (
      <div className="new-post-form">

        <h4>Submit to {subName}</h4>

        <label for="post-title">Title</label>
        <form onSubmit={this.handleSubmit}>
          <section>
            <h4>Title</h4>
            <input
              id="post-title"
              onChange={this.handleTitleChange}
              placeholder="the title!"
              value={this.state.title}
            />
          </section>

          <label for="post-body">Body</label>
          <section>
            <h4>Body</h4>
            <textarea
              id="post-body"
              onChange={this.handleBodyChange}
              placeholder="the body!"
              value={this.state.body}
            ></textarea>
          </section>

          <section>
            <h4>Choose a Subfreddit</h4>
            <input on value={subName} />
          </section>

          <button>Submit</button>

        </form>
      </div>
    );
  }

  _subsChanged() {
    this.setState({sub: SubStore.findByName(this.props.params.subName)});
  }

}
