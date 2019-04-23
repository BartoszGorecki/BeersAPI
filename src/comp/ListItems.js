import React, { Component } from "react";
import ListItem from "./ListItem";
import "../style/ListItems.css";

class ListItems extends Component {
  handleAlert = () => {
    const load = document.querySelector('.load')
    setTimeout(() => {
      load.classList.remove('max-load')
    }, 5000);
  }
  // componentWillReceiveProps(){}
  shouldComponentUpdate(nextProps) {
    if (nextProps.done !== this.props.done) {
      this.handleAlert()
      return true
    }
    if (nextProps.data !== this.props.data) {
      return true
    }
    return false
  }
  render() {
    const { data, showModal, done } = this.props;
    return (
      <div className="li-container" onClick={showModal}>
      <div className={'load ' + (done ? 'max-load' : '')}>There are no more drunks to load!</div>
        {data.map(({ image_url, name, tagline }, index) => {
          return (
            <ListItem key={index} image={image_url} name={name} tag={tagline} />
          );
        })}
      </div>
    );
  }
}
export default ListItems;
