import { theme, type ThemeConfig } from 'antd';
import { applyCssVariables } from './styles-config';

applyCssVariables();

export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#2f6fe0',
    colorSuccess: '#5fd68f',
    colorWarning: '#f2bf5e',
    colorError: '#f28b8b',
    colorInfo: '#7cb0ff',
    colorBgLayout: '#0d1421',
    colorBgContainer: '#131c2b',
    colorBgElevated: '#162033',
    colorBorder: '#26344d',
    colorBorderSecondary: '#213049',
    colorText: '#d7dee9',
    colorTextSecondary: '#7d8aa0',
    colorTextPlaceholder: '#6f7c90',
    borderRadius: 6,
    borderRadiusLG: 8,
    fontSize: 13,
  },
  components: {
    Layout: { siderBg: '#0a101b', headerBg: '#0f1726', bodyBg: '#0d1421' },
    Menu: { darkItemBg: '#0a101b', darkItemSelectedBg: '#16243b', darkItemSelectedColor: '#7cb0ff' },
    Table: { headerBg: '#101828', rowHoverBg: '#16243b', borderColor: '#1a2538' },
  },
};