import { useState } from 'react';
import { classNames } from '../../utils/formatters';
import './Tabs.css';

export default function Tabs({ tabs, defaultTab = 0 }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <div>
      <div className="tabs-list" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active === i}
            className={classNames('tabs-tab', active === i && 'tabs-tab-active')}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-panel">{tabs[active]?.content}</div>
    </div>
  );
}
