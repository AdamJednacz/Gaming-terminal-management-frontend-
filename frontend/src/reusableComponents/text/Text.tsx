interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: 'secondary';
}
import styles from './Text.module.scss';
const Text = ({ children, className, type }: TextProps) => {
  return (
    <p
      className={`${type === 'secondary' ? styles.secondary : ''} ${className || ''}`.trim()}
    >
      {children}
    </p>
  );
};

export default Text;
