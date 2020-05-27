import React from 'react';
import rows from './rows';
import scss from './index.module.scss';

const getClassNames = (keys = []) => keys.reduce((total, ele) => (
  `${total} ${scss[ele]}`
), scss.key);

export default () => (
  <div className={scss.body}>
    <div className={scss.keyboard}>
      {rows.map((row, rowIndex) => (
        <div className={scss['key-row']} key={rowIndex}>
          {row.map((col, colKey) => (
            <div className={getClassNames(col)} key={colKey}>
              <div className={scss['key-body']}>
                <div className={scss['key-title']}>
                  {col[0]}
                </div>
                {col[1] ?
                  <div className={scss['key-sub-title']}>
                    {col[1]}
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
