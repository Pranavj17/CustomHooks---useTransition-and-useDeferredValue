import { useEffect, useState, useRef } from 'react';

export const useDeferredValue = (intialValue, delay = 200) => {
  const [value, setValue] = useState(intialValue);
  const [deferredValue, setDeferredValue] = useState(intialValue);
  const timeOutId = useRef(null);
  const bindInput = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    }
  };
  useEffect(() => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
      timeOutId.current = '';
      setDeferredValue('');
    }
    timeOutId.current = setTimeout((changedVal) => {
      setDeferredValue(changedVal);
    }, delay, value);
  }, [value]);
  return [value, deferredValue, bindInput];
};

export const useTransition = () => {
  const [loading, setLoading] = useState(false);
  const timeOutId = useRef(null);
  const startTransition = (cb = () => {}) => {
    setLoading(true);
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    timeOutId.current = setTimeout(() => {
      cb();
      setLoading(false);
    }, 200);
  };
  return [loading, startTransition];
};

export default {
  useDeferredValue,
  useTransition,
};
