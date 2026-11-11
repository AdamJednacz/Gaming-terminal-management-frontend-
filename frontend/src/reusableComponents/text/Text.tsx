interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: 'secondary' | 'normal' | 'sm' | 'md' | 'lg';
}
import styles from './Text.module.scss';
const Text = ({ children, className, type }: TextProps) => {
  return (
    <p
      className={`${styles.text} ${type === 'lg' ? styles.lg : ''} ${type === 'md' ? styles.md : ''} ${type === 'sm' ? styles.sm : ''} ${type === 'normal' ? styles.normal : ''}  ${type === 'secondary' ? styles.secondary : ''} ${className || ''}`.trim()}
    >
      {children}
    </p>
  );
};

export default Text;
