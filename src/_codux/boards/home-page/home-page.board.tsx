import React from "react";
import { createBoard } from "@wixc3/react-board";
import { HomePage } from "../../../components/codux/home-page/home-page";

export default createBoard({
  name: "HomePage",
  Board: () => <HomePage />,
  environmentProps: {
    canvasHeight: 651,
    canvasWidth: 1171,
  },
});
