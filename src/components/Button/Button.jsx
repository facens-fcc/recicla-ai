import style from './Button.module.css';

const Button = ({ children, variant, ...props }) => {
  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag className={`${style.button} ${style[`button--${variant}`]}`} {...props}>
      {children}
    </Tag>
  );
};

export default Button;
