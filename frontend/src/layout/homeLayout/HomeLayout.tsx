import { Avatar, Button, Drawer, Grid, Layout, Popover, Tag } from 'antd';
import Sider from 'antd/es/layout/Sider';
import styles from './HomeLayout.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Text from '../../reusableComponents/text/Text';
import {
  appThemeTokens,
  iconSharedProps,
  iconSizes,
} from '../../utils/styles-config';

import { Header } from 'antd/es/layout/layout';
import { ChevronDown, LogOut, Menu } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import Logo from '../../reusableComponents/logo/Logo';
import { useAuth } from '../../hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { HomeLayoutConfig, type HomeLayoutMenuItemType } from './config';

const { useBreakpoint } = Grid;

const HomeLayout = () => {
  const [mobileSiderOpen, setMobileSiderOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items = HomeLayoutConfig.getItems();
  const activeKey = HomeLayoutConfig.getActiveKey(location.pathname);

  const pathname = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const renderUserSettings = (itemsApartForm?: ReactNode) => (
    <div className={styles.userSettings}>
      <div className={`${styles.userSettingsItem} ${styles.userData}`}>
        <Text className={styles.userDataText} type="normal">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className={styles.userDataText} type="secondary">
          {user?.email}
        </Text>
        <Tag variant="outlined" color="green">
          {user?.role}
        </Tag>
      </div>
      {itemsApartForm && (
        <div className={styles.userSettingsItem}>{itemsApartForm}</div>
      )}
      <Button
        className={styles.userSettingsItem}
        type="default"
        icon={<UserOutlined size={iconSizes.md} />}
      >
        Profile
      </Button>
      <Button
        className={styles.userSettingsItem}
        color="danger"
        variant="solid"
        icon={<LogOut size={iconSizes.md} />}
        onClick={() => logout()}
      >
        Log out
      </Button>
    </div>
  );

  const renderUserAvatar = (
    <Popover
      open={isUserMenuOpen}
      onOpenChange={setIsUserMenuOpen}
      trigger="click"
      placement="bottom"
      arrow={false}
      styles={{
        container: {
          padding: 'var(--app-padding-md)',
          border: '1px solid var(--app-border)',
          borderRadius: 'var(--app-border-radius)',
          backgroundColor: 'var(--app-neutral-bg)',
        },
      }}
      content={renderUserSettings()}
    >
      <div className={styles.userAvatar}>
        <Avatar size={30} />
        <Text className={styles.userDataText} type="normal">
          {user?.firstName} {user?.lastName}
        </Text>
        <ChevronDown
          size={16}
          aria-hidden
          className={`${styles.chevron} ${isUserMenuOpen ? styles.chevronOpen : ''}`}
        />
      </div>
    </Popover>
  );
  const renderItem = (item: HomeLayoutMenuItemType) => (
    <button
      className={`${styles.item} ${item.key === activeKey && styles.active} cleanBtn`}
      key={item.key}
      onClick={() => navigate(item.path)}
    >
      {item.key === activeKey && <span className={styles.indicator} />}
      <div className={styles.iconContainer}>{item.icon}</div>
      <span className="t-body">{item.label}</span>
    </button>
  );
  const renderHeader = (
    <>
      <Header className={styles.header}>
        <Logo />
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
        {renderUserSettings(
          <div className={styles.menu}>{items.map(renderItem)}</div>,
        )}
      </Drawer>
    </>
  );
  const renderSider = (
    <Sider className={styles.sider} width={appThemeTokens.siderWidth}>
      <div className={styles.siderInner}>
        <Logo />
        <div className={styles.menu}>{items.map(renderItem)}</div>
      </div>
    </Sider>
  );

  return (
    <Layout style={{ background: appThemeTokens.bgBase }}>
      {screens.lg ? renderSider : renderHeader}
      <Layout style={{ background: appThemeTokens.bgBase }}>
        <div className={`${styles.content} ${!screens.lg && styles.mobile}`}>
          <div className={styles.pageHeader}>
            <div>
              <p className={styles.pageHeaderPathName}>Home / {pathname}</p>
              <h4 className={styles.pageHeaderSectionName}>{pathname}</h4>
            </div>
            {screens.lg && renderUserAvatar}
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
