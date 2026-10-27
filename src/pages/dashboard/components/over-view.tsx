import { useIntl } from '@umijs/max';
import { Col, Row, Space } from 'antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import { overviewConfigs } from '../config';
import { DashboardContext } from '../config/dashboard-context';
import '../styles/index.less';
import styles from './over-view.less';

// Stat tile: icon + label, the number, and the supporting description.
// Sizing, weight and spacing all come from `.card` / `.card-title` /
// `.card-val` / `.card-desc` in `over-view.less`.
const renderCardItem = (data: {
  label: string;
  value: React.ReactNode;
  desc: string;
  logoUrl?: string;
}) => {
  const { label, value, desc, logoUrl } = data;
  return (
    <div className={styles['card']}>
      <div className={styles['card-title']}>
        <img src={logoUrl} /> {label}
      </div>
      <div className={styles['card-val']}>{value}</div>
      <p className={styles['card-desc']}>{desc}</p>
    </div>
  );
};
const Overview: React.FC = () => {
  const intl = useIntl();
  const data = useContext(DashboardContext).resource_counts || {};

  const renderValue = (
    value:
      | number
      | {
          healthy: number;
          warning: number;
          error: number;
        }
  ) => {
    if (typeof value === 'number') {
      return value;
    }
    return (
      <Space className="value-box" size={20}>
        <span className={'value-healthy'}>{value.healthy}</span>
        <span className={'value-warning'}>{value.warning}</span>
        <span className={'value-error'}>{value.error}</span>
      </Space>
    );
  };
  return (
    <div>
      <Row gutter={[20, 20]} className={styles.row}>
        {overviewConfigs.map((config, index) => (
          <Col span={12} key={config.key}>
            {renderCardItem({
              label: intl.formatMessage({ id: config.label }),
              value: renderValue(_.get(data, config.key, 0)),
              desc: config.desc ? intl.formatMessage({ id: config.desc }) : '',
              logoUrl: config.logoUrl
            })}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default React.memo(Overview);
