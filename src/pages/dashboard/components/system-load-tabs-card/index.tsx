import { CardWrapper } from '@gpustack/core-ui';
import { useIntl } from '@umijs/max';
import { Tabs } from 'antd';
import _ from 'lodash';
import { memo, useContext, useMemo } from 'react';
import { DashboardContext } from '../../config/dashboard-context';
import styles from './styles.less';

const USED_COLOR = '#0d0bf6';
const AVAILABLE_COLOR = '#eff0ff';

const formatPercent = (value: number) => `${_.round(value, 2).toFixed(2)}%`;

const UtilizationPanel = ({ value }: { value: number }) => {
  const intl = useIntl();
  const boundedValue = Math.min(Math.max(value || 0, 0), 100);
  const availableValue = _.round(100 - boundedValue, 2);
  const degrees = boundedValue * 3.6;

  return (
    <div className={styles.panel}>
      <div className={styles.chartStage}>
        <div
          className={styles.ring}
          style={{
            background: `conic-gradient(from -45deg, ${USED_COLOR} 0deg ${degrees}deg, ${AVAILABLE_COLOR} ${degrees}deg 360deg)`
          }}
        >
          <div className={styles.ringInner}>
            <div className={styles.value}>{formatPercent(boundedValue)}</div>
            <div className={styles.label}>Occupied</div>
          </div>
        </div>
      </div>
      <div className={styles.usageInfo}>
        <div className={styles.usageTitle}>
          {intl.formatMessage({ id: 'dashboard.usage.situation' })}
        </div>
        <div className={styles.usageRow}>
          <span
            className={styles.dot}
            style={{ backgroundColor: USED_COLOR }}
          ></span>
          <span className={styles.usageLabel}>
            {intl.formatMessage({ id: 'dashboard.currently.occupied' })}
          </span>
          <span className={styles.usageValue}>{formatPercent(boundedValue)}</span>
        </div>
        <div className={styles.usageRow}>
          <span
            className={styles.dot}
            style={{ backgroundColor: '#b9ecff' }}
          ></span>
          <span className={styles.usageLabel}>
            {intl.formatMessage({ id: 'dashboard.surplus.use' })}
          </span>
          <span className={styles.usageValue}>
            {formatPercent(availableValue)}
          </span>
        </div>
      </div>
    </div>
  );
};

const SystemLoadTabsCard = () => {
  const intl = useIntl();
  const data = useContext(DashboardContext)?.system_load?.current || {};

  const metrics = useMemo(
    () => [
      {
        key: 'vram',
        label: intl.formatMessage({ id: 'dashboard.vramutilization' }),
        value: _.round(data.vram || 0, 2)
      },
      {
        key: 'gpu',
        label: intl.formatMessage({ id: 'dashboard.gpuutilization' }),
        value: _.round(data.gpu || 0, 2)
      },
      {
        key: 'cpu',
        label: intl.formatMessage({ id: 'dashboard.cpuutilization' }),
        value: _.round(data.cpu || 0, 2)
      },
      {
        key: 'ram',
        label: intl.formatMessage({ id: 'dashboard.memoryutilization' }),
        value: _.round(data.ram || 0, 2)
      }
    ],
    [data, intl]
  );

  return (
    <CardWrapper style={{ height: 376, overflow: 'hidden', paddingTop: 0 }}>
      <Tabs
        className={styles.tabs}
        defaultActiveKey="vram"
        items={metrics.map((item) => ({
          key: item.key,
          label: item.label,
          children: <UtilizationPanel value={item.value} />
        }))}
      />
    </CardWrapper>
  );
};

export default memo(SystemLoadTabsCard);
