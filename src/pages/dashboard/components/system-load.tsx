import breakpoints from '@/config/breakpoints';
import useWindowResize from '@/hooks/use-window-resize';
import { useIntl } from '@umijs/max';
import _ from 'lodash';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { DashboardContext } from '../config/dashboard-context';
import ResourceUtilization from './resource-utilization';
import styles from './system-load.less';

const SystemLoad = () => {
  const intl = useIntl();
  console.log('data', useContext(DashboardContext));
  const { size } = useWindowResize();
  const [paddingRight, setPaddingRight] = useState<string>('20px');

  const height = 400;

  useEffect(() => {
    if (size.width < breakpoints.xl) {
      setPaddingRight('0');
    } else {
      setPaddingRight('20px');
    }
  }, [size.width]);

  return (
    <div className={styles['line-box']}>
      <p className={styles['title']}>{intl.formatMessage({ id: 'dashboard.systemload' })}</p>
      <div style={{ height: height, width: '100%',padding:'10px' }}>
        <ResourceUtilization />
      </div>
    </div>
  );
};

export default memo(SystemLoad);
