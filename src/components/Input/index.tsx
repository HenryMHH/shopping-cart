import styles from './styles.module.scss';

type Props = {
  className?: string;
  [x: string]: any;
};

const Input = ({ className, ...rest }: Props) => {
  return <input {...rest} className={`${styles['input']} ${className}`} />;
};

export default Input;
