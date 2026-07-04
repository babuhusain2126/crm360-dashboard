import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/formatters';
import './Dropdown.css';

export default function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className={classNames('dropdown-menu', `dropdown-${align}`)} onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}
