import React from "react";
import { Progress, Button } from "antd";
const ButtonGroup = Button.Group;

class ProgressBar extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Progress percent={this.props.progress} />
      </div>
    );
  }
}

export default ProgressBar;
