/* eslint-disable no-unused-vars */
import React, { useCallback, useState, Component } from 'react';


class A extends Component {
  state = {
    count: 2,
  };

  handleClick = () => {
    this.setState(
      (pre) => ({ count: pre.count + 1 }),
      () => {
        // 获取修改后的状态
        this.preState = this.state;
      },
    );
  };

  render () {
    return (
      <div onClick={this.handleClick}>
        {this.state.count}
      </div>
    );
  }
}

export default A;

// export default () => {
//   const [count, setCount] = useState(1);

//   const handleClick = useCallback(() => {
//     setCount((pre) => (pre + 1));
//   }, []);

//   return (
//     <div onClick={handleClick}>
//       {count}
//     </div>
//   );
// };
