import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../reusableComponents/logo/Logo';
import Text from '../../reusableComponents/text/Text';
import styles from './AuthorizationPageLayout.module.scss';
import { Tabs } from 'antd';
import { RoutePath } from '../../common/enums/routePath';

import RolesTable from './content/RolesTable/RolesTable';
import SystemStatus from './content/SystemStatus/SystemStatus';

const AuthorizationPageLayout = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isSignIn = pathname === RoutePath.SIGN_IN;
  const routes = [
    {
      key: RoutePath.SIGN_IN,
      label: 'Login',
    },
    {
      key: RoutePath.SIGN_UP,
      label: 'Register',
    },
  ];
  return (
    <div className={styles.authPageLayout}>
      <header className={styles.authPageLayoutHeader}>
        <Logo />
        <Text type="secondary">Demo App v. 1.0</Text>
      </header>
      <main className={styles.authPageLayoutMain}>
        <div className={styles.authPageLayoutOutlet}>
          {pathname === RoutePath.SIGN_IN && (
            <>
              <h1 className={styles.authPageLayoutTitle}>Sign In to GTMS</h1>
              <Text type="secondary">
                Terminals monitoring, locations and incidents in one place.
              </Text>
            </>
          )}
          {pathname === RoutePath.SIGN_UP && (
            <>
              <h1 className={styles.authPageLayoutTitle}>Sign Up for GTMS</h1>
              <Text type="secondary">
                Create an account to access all features.
              </Text>
            </>
          )}

          <Tabs
            activeKey={pathname}
            items={routes}
            onChange={(key) => navigate(key)}
          />
          <div key={pathname} className={styles.formEnter}>
            <Outlet />
          </div>
        </div>

        <div className={styles.authPageLayoutContent}>
          <div
            className={isSignIn ? styles.panelActive : styles.panel}
            aria-hidden={!isSignIn}
          >
            <SystemStatus />
          </div>
          <div
            className={isSignIn ? styles.panel : styles.panelActive}
            aria-hidden={isSignIn}
          >
            <RolesTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorizationPageLayout;
