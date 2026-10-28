import type { LucideProps } from 'lucide-react';

export const appThemeTokens = {
  // primary (niebieski akcent)
  primary: '#2f6fe0',
  primaryHover: '#4c86e8',
  primaryLight: '#7cb0ff',
  primaryBg: '#16243b',
  primaryBgStrong: '#1c3a6b',

  // accent (wykresy, wyróżnienia)
  accent: '#4c86e8',
  accentBg: '#122440',
  accentTextColor: '#ffffff',

  // semantyczne
  success: '#5fd68f',
  successBg: '#0f2a1b',
  successBorder: '#1d4d31',

  warning: '#f2bf5e',
  warningBg: '#2b2010',
  warningBorder: '#5a4318',

  orange: '#f0a070',
  orangeBg: '#2b1a10',
  orangeBorder: '#5a3418',

  error: '#f28b8b',
  errorBg: '#2c1416',
  errorBorder: '#5a2427',

  info: '#7cb0ff',
  infoBg: '#122440',
  infoBorder: '#24477a',

  neutral: '#a3adbd',
  neutralBg: '#1a2232',
  neutralBorder: '#2c3a52',

  // tła
  bgBase: '#0d1421',
  bgOverlay: '#0a101b',
  bgLayout: '#0d1421',
  bgContainer: '#131c2b',
  bgElevated: '#162033',
  bgSider: '#0a101b',
  bgHeader: '#0f1726',
  bgInput: '#0f1726',
  bgTableHeader: '#101828',
  bgRowHover: '#16243b',

  // obramowania
  border: '#26344d',
  borderSecondary: '#213049',
  borderLayout: '#1f2a3c',
  borderSubtle: '#1a2538',
  checkboxBorderColor: '#2a3a55',

  // tekst
  textBase: '#eef2f8',
  text: '#d7dee9',
  textSecondary: '#8592a6',
  textTertiary: '#7d8aa0',
  textQuaternary: '#6f7c90',

  // typografia
  fontFamily: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
  fontSize: '13px',
  fontSizeSm: '11px',
  fontSizeLg: '15px',
  borderRadius: '8px',
  borderRadiusSm: '6px',
  borderRadiusXs: '4px',

  // dodatkowe tła
  bgContainerLighter: '#1a2538',
  bgContainerDarker: '#0f1726',

  // layout
  topBarHeight: '56px',
  footerHeight: '40px',
  globalContentHeight:
    'calc(var(--app-viewport-height, 100vh) - var(--app-top-bar-height))',
  contentPadding: '16px',
  contentPaddingLg: '24px',
  siderWidth: 220,
  siderWidthPx: '220px',
  siderCollapsedWidth: 72,
  siderCollapsedWidthPx: '72px',
  drawerBackdropBg: '#05080fb8',
  drawerWidth: 480,
  drawerWidthPx: '480px',
  toastNotificationBg: '#162033',
  boxShadow: `
  0 6px 16px 0 rgba(0, 0, 0, 0.32),
  0 3px 6px -4px rgba(0, 0, 0, 0.4),
  0 9px 28px 8px rgba(0, 0, 0, 0.2)
`,

  // font weights
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  // z-index
  siderZIndex: 100,
  headerZIndex: 99,
  loadingOverlayZIndex: 20,
  saveOverlayZIndex: 1001,
  maxZIndex: 999,
};

// kolory statusów terminali i incydentów (tekst / tło tagu / obramowanie)
type TagColors = { color: string; bg: string; border: string };

const tag = (key: 'success' | 'warning' | 'orange' | 'error' | 'info' | 'neutral'): TagColors => ({
  color: appThemeTokens[key],
  bg: appThemeTokens[`${key}Bg`],
  border: appThemeTokens[`${key}Border`],
});

export const terminalStatusColors = {
  ONLINE: tag('success'),
  OFFLINE: tag('neutral'),
  ERROR: tag('error'),
  MAINTENANCE: tag('warning'),
} as const satisfies Record<string, TagColors>;

export const incidentPriorityColors = {
  LOW: tag('neutral'),
  MEDIUM: tag('warning'),
  HIGH: tag('orange'),
  CRITICAL: tag('error'),
} as const satisfies Record<string, TagColors>;

export const incidentStatusColors = {
  OPEN: tag('warning'),
  IN_PROGRESS: tag('info'),
  RESOLVED: tag('success'),
  CLOSED: tag('neutral'),
} as const satisfies Record<string, TagColors>;

export const appBreakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const appSpacings = {
  paddingSM: 8,
  paddingMD: 12,
  paddingLG: 16,
  paddingXL: 24,
  marginSM: 8,
  marginMD: 12,
  marginLG: 16,
  marginXL: 24,
  spacing1: 4,
  spacing2: 8,
  spacing3: 12,
  spacing4: 16,
  spacing5: 24,
  spacing6: 48,
};

export const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  logo:35,

};

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodyTitle'
  | 'footNote'
  | 'danger'
  | 'secondary'
  | 'formSectionTitle';

export const iconSharedProps: LucideProps = {
  color: appThemeTokens.textSecondary,
  strokeWidth: 1.5,
  size: iconSizes.md,
};


function toKebabCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Generate CSS variables object
 */
function createThemeCssVariables(
  prefix = 'app-',
  tokens = appThemeTokens,
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // design tokens
  Object.entries(tokens).forEach(([key, value]) => {
    cssVars[`--${prefix}${toKebabCase(key)}`] = String(value);
  });

  // breakpoints
  Object.entries(appBreakpoints).forEach(([key, value]) => {
    cssVars[`--${prefix}breakpoint-${key}`] = `${value}px`;
  });

  // spacings (padding / margin)
  Object.entries(appSpacings).forEach(([key, value]) => {
    cssVars[`--${prefix}${toKebabCase(key)}`] = `${value}px`;
  });
  // icon sizes
  Object.entries(iconSizes).forEach(([key, value]) => {
    cssVars[`--${prefix}icon-size-${key}`] = `${value}px`;
  });
  return cssVars;
}

const injectCssVariables = (vars: Record<string, string>) => {
  const existing = document.getElementById('theme-css-vars');
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = 'theme-css-vars';
  style.innerHTML = `
    :root {
      ${Object.entries(vars)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
    }
  `;

  document.head.appendChild(style);
};

/**
 * Apply CSS variables globally to :root
 */
export const applyCssVariables = () => {
  const vars = createThemeCssVariables();
  injectCssVariables(vars);
};
