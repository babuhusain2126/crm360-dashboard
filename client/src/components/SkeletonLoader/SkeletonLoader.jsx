import { classNames } from '../../utils/formatters';
import './SkeletonLoader.css';

export default function SkeletonLoader({ width = '100%', height = '16px', radius = 'var(--radius-sm)', className, count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={classNames('skeleton', className)}
          style={{ width, height, borderRadius: radius, display: 'block', marginBottom: count > 1 ? 8 : 0 }}
        />
      ))}
    </>
  );
}
