import { PageContainer } from '@ant-design/pro-components';
import { Spin } from 'antd';
import { useState } from 'react';
import DashboardInner from './components/dahboard-inner';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageContainer
        ghost
        extra={[]}
        header={{
          title: null,
          style: {
          }
        }}
        style={{
          position: 'relative',
          top:'-40px'
        }}
      >
        <Spin spinning={loading}>
          <DashboardInner setLoading={setLoading} />
        </Spin>
      </PageContainer>
    </>
  );
};

export default Dashboard;
