import React, { FC } from "react";

type Props = {
  title: string;
};

const Tab: FC<Props> = ({ children }) => {
  return <div className="tab-container">{children}</div>;
};

export default Tab;
