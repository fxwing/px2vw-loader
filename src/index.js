import React from "react";
import ReactDom from "react-dom";

import { Button } from "antd";
import "./index.css";
import "antd/dist/antd.css";
ReactDom.render(
  <>
    <div>1</div>
    <Button type="primary">按钮</Button>
  </>,
  document.getElementById("root")
);
