import React from "react";

export default class SortingTabs extends React.Component {

  render() {
    let tabs = ["hot", "new", "top"].map((sort, idx) => {
      let className = (sort == this.props.sort ? "selected" : "");

      return(
         <li className={className} key={idx}>
           <a href={this.props.url + "/" + sort}>{sort}</a>
         </li>
      );

    });

    return (
      <ul className="tabs">
        {tabs}
      </ul>
    );
  }
}
