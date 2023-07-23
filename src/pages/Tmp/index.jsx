/* eslint-disable no-unused-vars */
import React, { useRef, useCallback, useState, Component } from 'react';

class A extends Component {
  handleRef = (ele) => {
    console.log('%c [ ele - 1 ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', ele);

    return () => {
      console.log('%c [ ele - 2 ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', ele);
    };
  };

  render () {
    return (
      <div ref={this.handleRef}>
        1
      </div>
    );
  }
}

const B = () => {
  const handleRef = useCallback((ele) => {
    console.log('%c [ ele - 1 ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', ele);

    return () => {
      console.log('%c [ ele - 2 ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', ele);
    };
  }, []);

  return (
    <div ref={handleRef}>
      2
    </div>
  );
};

export default () => {
  const mainRef = useRef();
  const [count, setCount] = useState(1);

  const handleClick = useCallback(() => {
    setCount((pre) => (pre + 1));
  }, []);
  console.log('%c [ mainRef ]-31', 'font-size:13px; background:pink; color:#bf2c9f;', mainRef);
  return (
    <div onClick={handleClick}>
      {count}
      <B
        count={count}
        ref={mainRef}
      />
    </div>
  );
};
