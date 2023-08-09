/* eslint-disable no-var */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useMemo, useCallback, useState, Component } from 'react';

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
  for (let i = 0; i < 3; i += 1) {
    var data = useMemo(() => i, [i]);
  }

  console.log('%c [ data ]-46', 'font-size:13px; background:pink; color:#bf2c9f;', data);

  return (
    <div >
      1
    </div>
  );
};

