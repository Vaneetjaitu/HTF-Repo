import * as React from "react";

const HeaderComponent = (props) => {
  const { className, heading } = props;
  return (
    <header>
      <h1 className={className}>{heading}</h1>
    </header>
  );
};

export default HeaderComponent;
