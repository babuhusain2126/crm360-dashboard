import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-code">404</span>
      <h2>Page not found</h2>
      <p className="text-secondary">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/"><Button>Back to dashboard</Button></Link>
    </div>
  );
}
