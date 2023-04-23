import React from 'react';
import classes from './input.module.css'

const Input = React.forwardRef((props, ref) => {
  return (
      <input ref={ref} {...props} className={classes.input} />
  );
});

export default Input;