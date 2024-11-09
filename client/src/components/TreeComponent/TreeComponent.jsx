import React from "react";
import { useSpring, animated } from "react-spring";
import "./TreeComponent.css";

const Tree = ({ progress }) => {
  const props = useSpring({
    height: progress * 100 + "%",
    from: { height: "0%" },
  });

  return (
    <div className="tree-container">
      <animated.div className="tree" style={props} />
    </div>
  );
};

const TreeComponent = (props) => {
  const { totalDays, streakCount } = props;

  return (
    <div className="app">
      <Tree progress={streakCount / totalDays} />
      <p>
        Current Day: {streakCount} / {totalDays}
      </p>
    </div>
  );
};

export default TreeComponent;
