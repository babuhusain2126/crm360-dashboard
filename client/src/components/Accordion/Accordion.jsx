import { useState } from 'react';
import { classNames } from '../../utils/formatters';
import './Accordion.css';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button className="accordion-trigger" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
            <span>{item.title}</span>
            <span className={classNames('accordion-chevron', openIndex === i && 'accordion-chevron-open')}>⌄</span>
          </button>
          {openIndex === i && <div className="accordion-content">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}
