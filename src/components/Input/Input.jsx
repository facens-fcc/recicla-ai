const Input = ({ id, label, ...props }) => {
  const Tag = props.type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <Tag className="input" id={id} {...props} />
    </div>
  );
};

export default Input;
