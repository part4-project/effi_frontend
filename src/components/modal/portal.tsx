import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const el = document.getElementById('modal');
  if (!el) return null;

  return ReactDOM.createPortal(children, el);
};

export default Portal;
