import { useLocation } from "react-router-dom";
import { HomeLayoutConfig, type HomeLayoutMenuItemType } from "./config";
import styles from "./HomeSiderMenu.module.scss";
import type { RoutePath } from "../../common/enums";
interface Props {
  onClick: (path: RoutePath) => void;
}
const HomeSiderMenu = ({ onClick }: Props) => {
  const location = useLocation();
  const items = HomeLayoutConfig.getItems();
  const activeKey = HomeLayoutConfig.getActiveKey(location.pathname);

  const renderItem = (item: HomeLayoutMenuItemType) => (
    <button
      className={`${styles.item} ${item.key === activeKey && styles.active} cleanBtn`}
      key={item.key}
      onClick={() => onClick(item.path)}
    >
      {item.key === activeKey && <span className={styles.indicator} />}
      <div className={styles.iconContainer}>{item.icon}</div>
      <span className="t-body">{item.label}</span>
    </button>
  );

  return <div className={styles.menu}>{items.map(renderItem)}</div>;
};

export default HomeSiderMenu;
