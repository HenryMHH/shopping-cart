import styles from './styles.module.scss';

type Props = {
  className?: string;
  displayType?: 'normal' | 'cancel';
  [x: string]: any;
};

const Button = ({
  className,
  displayType = 'normal',
  children,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={`${styles['button']} ${className} ${styles[displayType]}`}
    >
      {children}
    </button>
  );
};

export default Button;
