import { useRef, useEffect } from 'react';

const usePreviousValue = <T,>(value: T) => {
  const valueRef = useRef<T>();

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
};

export default usePreviousValue;
