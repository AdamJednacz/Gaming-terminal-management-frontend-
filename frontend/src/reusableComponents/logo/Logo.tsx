import { Gamepad2 } from 'lucide-react';
import styles from './Logo.module.scss';
import { appThemeTokens, iconSizes } from '../../utils/styles-config';
const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.logoIcon}>
        <Gamepad2
          size={iconSizes.logo}
          color={`${appThemeTokens.primaryLight}`}
        />
      </span>
      <span className={styles.logoText}>GTMS</span>
    </div>
  );
};

export default Logo;
