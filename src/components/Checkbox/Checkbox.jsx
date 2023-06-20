import style from './Checkbox.module.css';

const Checkbox = ({ id, label, icon, checked, ...props }) => {
  return (
    <div className={style.checkbox}>
      <input className={`${style.checkbox__input} visually-hidden`} type="checkbox" checked={checked} id={id} {...props} />
      <div className={style.checkbox__mark}></div>
      <label className={style.checkbox__label} htmlFor={id}>
        {label}
        <img className={style.checkbox__icon} src={icon} alt="..." aria-hidden="true" />
      </label>
    </div>
  );
};

export default Checkbox;
