import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RoutePath } from '../common/enums/routePath';
import { Spin } from 'antd';

interface Props {
  canBeAuthorized: boolean;
  canBeUnauthorized: boolean;
}


const ProtectedRoute = ({ canBeAuthorized, canBeUnauthorized }: Props) => {
  const { isAuthorized, isLoading } = useAuth();
  if (isLoading) {
    return <Spin fullscreen />;
  }
  if (canBeAuthorized && !canBeUnauthorized) {
    if (isAuthorized) {
      return <Outlet />;
    } else {
      return <Navigate to={RoutePath.SIGN_IN} replace />;
    }
  }
  if (!canBeAuthorized && canBeUnauthorized) {
    if (isAuthorized) {
      return <Navigate to={RoutePath.DASHBOARD} replace />;
    } else {
      return <Outlet />;
    }
  }

  return <div></div>;
};

export default ProtectedRoute;
