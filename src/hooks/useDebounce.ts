import { useState, useEffect } from 'react';

export const useDebounce = (val: any, delay: number) => {
  const [value, setValue] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, val]);

  return value;
};
