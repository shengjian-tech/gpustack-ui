import { memo, useCallback, useEffect, useState } from 'react';
import { Col, Row} from 'antd';
import { queryDashboardData } from '../apis';
import DashboardContext from '../config/dashboard-context';
import { DashboardProps } from '../config/types';
import ActiveTable from './active-table';
import Overview from './over-view';
import SystemLoad from './system-load';
import SystemLoadChat from './system-load-chat';
import Usage from './usage';

const Dashboard: React.FC<{ setLoading: (loading: boolean) => void }> = ({
  setLoading
}) => {
  const [data, setData] = useState<DashboardProps>({} as DashboardProps);

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await queryDashboardData();
      setData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setData({} as DashboardProps);
    }
  }, []);
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <DashboardContext.Provider value={{ ...data, fetchData: getDashboardData }}>
      <Row gutter={20}>
        <Col span={12}>
          <Overview></Overview>
        </Col>
        <Col span={12}>
          <SystemLoadChat></SystemLoadChat>
        </Col>
      </Row>
      <SystemLoad></SystemLoad>
      <Usage></Usage>
      <ActiveTable></ActiveTable>
    </DashboardContext.Provider>
  );
};

export default memo(Dashboard);
