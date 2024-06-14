import { ComponentType, useEffect } from 'react';
import { useGroupStore } from '@stores/group';
import { useNavigate } from 'react-router-dom';

const AdminHOC = <P extends object>(Component: ComponentType<P>) => {
  const HOCComponent: React.FC<P> = (props: P) => {
    const groupId = useGroupStore((state) => state.groupId);
    const navigate = useNavigate();

    useEffect(() => {
      if (!groupId) navigate('/');
    }, [groupId, navigate]);

    return <Component {...props} />;
  };

  return HOCComponent;
};

export default AdminHOC;
