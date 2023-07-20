/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';

export default () => {
  const [count, setCount] = useState(1);

  const handleClick = useCallback(() => {
    setCount((pre) => (pre + 1));
  }, []);

  return (
    <div onClick={handleClick}>
      {count}
    </div>
  );
};
