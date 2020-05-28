// 参考: https://codepen.io/MananTank/pen/LYVoqyy
import React from 'react';
import rows from './rows';
import classNames from 'classnames';
import scss from './index.module.scss';

const useStateHook = () => {
  const [keyDowns, setKeyDowns] = React.useState([]);

  // 按下键盘
  const onKeyDown = React.useCallback(e => {
    const keys = rows.flat();
    const key = keys.find(v => v.keyCode === e.keyCode);
    if (!key) {
      return false;
    }
    setKeyDowns([... new Set([... keyDowns, key.keyCode])]);
  }, [keyDowns]);

  // css 过度完成触发
  const onTransitionEnd = ({ keyCode }) => {
    keyDowns.includes(keyCode) &&
    setKeyDowns(keyDowns.filter(v => v !== keyCode));
  };

  React.useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return { onTransitionEnd, keyDowns };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.body}>
      <div className={scss.keyboard}>
        {rows.map((row, rowIndex) => (
          <div className={scss['key-row']} key={rowIndex}>
            {row.map((key, colKey) => (
              <div
                key={colKey}
                onTransitionEnd={state.onTransitionEnd.bind(null, key)}
                className={classNames(
                  scss.key,
                  scss[key.name],
                  { [scss.pressed]: state.keyDowns.includes(key.keyCode) }
                )}>
                <div className={scss['key-body']}>
                  <div className={scss['key-title']}>
                    {key.title}
                  </div>
                  {key.subTitle ?
                    <div className={scss['key-sub-title']}>
                      {key.subTitle}
                    </div> : null
                  }
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
