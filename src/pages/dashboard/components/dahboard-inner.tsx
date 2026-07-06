import { Col, Row } from 'antd';
import ActiveTable from './active-table';
import Overview from './over-view';
import SystemLoad from './system-load';
import SystemLoadTabsCard from './system-load-tabs-card';
import Usage from './usage';

const Dashboard: React.FC = () => {
  return (
    <>
      <Row
        gutter={[20, 20]}
        style={{ background: 'var(--color-bg-1)', padding: '20px 0' }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Overview></Overview>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <SystemLoadTabsCard></SystemLoadTabsCard>
        </Col>
      </Row>
      <SystemLoad></SystemLoad>
      <Usage></Usage>
      <ActiveTable></ActiveTable>
    </>
  );
};

export default Dashboard;
