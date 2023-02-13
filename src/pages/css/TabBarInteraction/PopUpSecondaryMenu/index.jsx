// 参考: https://codepen.io/dev_loop/pen/pojJRKq
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <div className={scss.menu}>
      <div className={scss['menu-item']}>
        <HomeOutlined />
      </div>
      <div className={scss['menu-item']}>
        <button className={scss['sub-menu']}>
          <div className={scss['sub-menu-item']}>
            <div
              style={{ '--index': 0 }}
              className={scss['sub-menu-item-content']}>
              <PlusOutlined />
            </div>
          </div>
          <div className={scss['sub-menu-item']}>
            <div
              style={{ '--index': 1 }}
              className={scss['sub-menu-item-content']}>
              <WeiboCircleOutlined />
            </div>
          </div>
          <div className={scss['sub-menu-item']}>
            <div
              style={{ '--index': 2 }}
              className={scss['sub-menu-item-content']}>
              <TaobaoCircleOutlined />
            </div>
          </div>
          <div className={scss['sub-menu-item']}>
            <div
              style={{ '--index': 3 }}
              className={scss['sub-menu-item-content']}>
              <AlipayCircleOutlined />
            </div>
          </div>
        </button>
      </div>
      <div className={scss['menu-item']}>
        <SettingOutlined />
      </div>
    </div>
  </div>
);
