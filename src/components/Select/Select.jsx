import style from './Select.module.css';

const Select = ({ id, label, options, ...props }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select className={`${style.select} input`} defaultValue={'default'} id={id} {...props}>
        <option value="default" disabled>
          Selecione
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
