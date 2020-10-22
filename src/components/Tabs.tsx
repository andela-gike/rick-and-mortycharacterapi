import React, { FC, ReactElement, useState, useCallback } from "react";

type Props = {
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

type TabsProps = {
  children: ReactElement[];
};

const TabTitle: FC<Props> = ({ title, selectedTab, setSelectedTab, index }) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);
  return (
    <li className={`${selectedTab===index ? "active": ""}`}>
      <button onClick={onClick} className={`tab-cta ${selectedTab===index ? "active": ""}`}>
        {title}
      </button>
    </li>
  );
};

const Tabs: FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <ul className="tab-header">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
