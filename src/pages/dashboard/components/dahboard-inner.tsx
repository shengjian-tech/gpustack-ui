import { memo } from 'react';
import { Col, Row } from 'antd';
import ActiveTable from './active-table';
import Overview from './over-view';
import SystemLoad from './system-load';
import SystemLoadChat from './system-load-chat';
import Usage from './usage';

const Dashboard: React.FC = () => {
  return (
    <>
      <Row gutter={20} style={{ background: 'var(--color-bg-1)', padding: '20px 0' }}>
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
    </>
  );
};

export default memo(Dashboard);
