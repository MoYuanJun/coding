/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

export default () => (
  <div className={scss.wrapper}>
    <div className={scss.ear}>
      <div className={scss['ear-left']} />
      <div className={scss['ear-right']} />
    </div>
    <div className={scss.girl}>
      <div className={scss['eye-left']} />
      <div className={scss['eye-right']} />
      <div className={scss.mouth} />
    </div>
    <div className={scss.male}>
      <div className={scss.eyebrow} />
      <div className={scss.eye}>
        <div className={scss['eye-item']}>
          <div className={scss.eyelid} />
          <div className={scss.eyelash} />
        </div>
        <div className={scss['eye-item']}>
          <div className={scss.eyelid} />
          <div className={scss.eyelash} />
        </div>
      </div>
    </div>
  </div>
);
