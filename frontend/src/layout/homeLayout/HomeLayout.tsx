import { Button, Drawer, Grid, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import styles from "./HomeLayout.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import {
  appThemeTokens,
  iconSharedProps,
  iconSizes,
} from "../../utils/styles-config";
import HomeSiderMenu from "./HomeSiderMenu";
import { Header } from "antd/es/layout/layout";
import { Menu } from "lucide-react";
import { useState } from "react";
const { useBreakpoint } = Grid;

const HomeLayout = () => {
  const [mobileSiderOpen, setMobileSiderOpen] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();

  const navigate = useNavigate();
  const pathname = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const renderHeader = (
    <>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>
            <Gamepad2
              size={iconSizes.logo}
              color={`${appThemeTokens.primaryLight}`}
            />
          </span>
          <span className={styles.logoText}>GTMS</span>
        </div>
        <Button
          className="iconBtnCentered accent"
          color="default"
          variant="filled"
          size="large"
          onClick={() => setMobileSiderOpen(true)}
          icon={<Menu {...iconSharedProps} color={appThemeTokens.accent} />}
        />
      </Header>

      <Drawer
        closable
        onClose={() => setMobileSiderOpen(false)}
        open={mobileSiderOpen}
        size={320}
      >
        <HomeSiderMenu onClick={(path) => navigate(path)} />
      </Drawer>
    </>
  );

  const renderSider = (
    <Sider className={styles.sider} width={appThemeTokens.siderWidth}>
      <div className={styles.siderInner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>
            <Gamepad2
              size={iconSizes.logo}
              color={`${appThemeTokens.primaryLight}`}
            />
          </span>
          <span className={styles.logoText}>GTMS</span>
        </div>
        <HomeSiderMenu onClick={(path) => navigate(path)} />
      </div>
    </Sider>
  );

  return (
    <Layout style={{ background: appThemeTokens.bgBase }}>
      {screens.lg ? renderSider : renderHeader}
      <Layout style={{ background: appThemeTokens.bgBase }}>
        <div className={`${styles.content} ${!screens.lg && styles.mobile}`}>
          <div className={styles.pageHeader}>
            <p className={styles.pageHeaderPathName}>Home / {pathname}</p>
            <h3 className={styles.pageHeaderSectionName}>{pathname}</h3>
          </div>
          <div className={styles.outlet}>
            <Outlet />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
