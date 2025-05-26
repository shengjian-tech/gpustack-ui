import { useIntl } from '@umijs/max';
import { Card, Col, Row, Space } from 'antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import { overviewConfigs } from '../config';
import { DashboardContext } from '../config/dashboard-context';
import '../styles/index.less';
import styles from './over-view.less';

const renderCardItem = (data: {
  label: string;
  value: React.ReactNode;
  bgColor: string;
  desc: string;
  logoUrl?: string;
}) => {
  const { label, value, bgColor,desc,logoUrl } = data;
  return (
    <>
      {/* <Card
        style={{ background: 'var(--color-white-1)' }}
        className={styles['card-body']}
      >
        <div className={styles.content}>
          <div className="label font-500">{label}</div>
          <div className="value font-500">{value}</div>
        </div>
      </Card> */}
      <div className={styles['card']}>
        <div className={styles['card-title']}>
          <img src={logoUrl} /> {label}
        </div>
        <div className={styles['card-val']}>
          {value}
        </div>
        <p className={styles['card-desc']}>{desc}</p>
      </div>
    </>
    
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
          <Col
            span={12}
            key={config.key}
          >
            {renderCardItem({
              label: intl.formatMessage({ id: config.label }),
              value: renderValue(_.get(data, config.key, 0)),
              bgColor: config.backgroundColor,
              desc: intl.formatMessage({ id: config.desc }),
              logoUrl: config.logoUrl
            })}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default React.memo(Overview);
