import React from 'react';
import SubStore from '../../stores/sub_store';
import SubApiUtil from '../../util/sub_api_util';

let subClassName = function (item, match) {
    return item === match ? "current-sub" : "";
};

export default class Sub extends React.Component {

  constructor(props) {
    super(props);
    this.state = { subs: SubStore.all() };
  }

  componentDidMount() {
    this.subListener = SubStore.addListener(this._subChanged.bind(this));
    SubApiUtil.fetchSubs();
  }

  componentWillUnmount() {
    this.subListener.remove();
  }

  render() {
    let className = subClassName(this.props.subName, "all");
    let subs = (
      this.state.subs.map(sub => {
        let className = subClassName(this.props.subName, sub.title);
        return (
          <li className={className} key={sub.id}>
            <a href={"#/r/" + sub.title}>{sub.title}</a>
          </li>
        );
      })
    );

    return (
      <div className="sub-list">
      <ul>
        <li>
          <a className={className} href={"#/"}>all</a>
        </li>
        {subs}
      </ul>
      </div>
    );
  }

  _subChanged() {
    this.setState({ subs: SubStore.all() });
  }

}
