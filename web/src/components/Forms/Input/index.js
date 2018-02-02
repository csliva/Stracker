// @flow
import React from 'react';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
}

const Input = ({ input, label, type, placeholder, style, meta }: Props) =>
  <div className="form__item">
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form__input"
    />
    {meta.touched && meta.error &&
      <div className="form__error">{meta.error}</div>
    }
  </div>;

export default Input;
