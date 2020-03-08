import { useState } from 'react';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = ({ target }) => {
    const { value: val, type } = target;
    setValue(type === 'number' ? parseFloat(val) : val);
  };

  return [value, handleChange];
};

export { useInput };
