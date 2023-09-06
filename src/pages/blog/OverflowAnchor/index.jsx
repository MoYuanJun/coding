/* eslint-disable no-unused-vars */
import React, { useState } from 'react';


export default () => {
  const [text, setText] = useState();

  return (
    <div>
      {text}
    </div>
  );
};
