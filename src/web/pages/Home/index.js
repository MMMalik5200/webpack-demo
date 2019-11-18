import React from "react";
import css from "./index.scss";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={css["text"]}>这是Home组件</div>;
  }
}
