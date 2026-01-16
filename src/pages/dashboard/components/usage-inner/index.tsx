import breakpoints from '@/config/breakpoints';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import { FC, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { DASHBOARD_STATS_API } from '../../apis';
import { baseColorMap } from '../../config';
import { DashboardContext } from '../../config/dashboard-context';
import { DashboardUsageData } from '../../config/types';
import ExportData from './export-data';
import FilterBar from './filter-bar';
import RequestTokenInner from './request-token-inner';
import TopUser from './top-user';
import useUsageData from './use-usage-data';
import styles from './index.less';

const TitleWrapper = styled.div`
  margin: 0;
  font-weight: 700;
`;

const UsageInner: FC<{ maxWidth: number }> = ({ maxWidth }) => {
  const intl = useIntl();
  const { model_usage } = useContext(DashboardContext);

  const { requestTokenData, topUserData } = useUsageData(model_usage || {});
  console.log('---requestTokenData---', requestTokenData)

  return (
    <div>
      <Row gutter={maxWidth < breakpoints.xl ? [0, 0] : [20, 20]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '20px 0 '
            }}
          >
            <TitleWrapper>
              {intl.formatMessage({ id: 'dashboard.usage' })}
            </TitleWrapper>
            <FilterBar
              url={DASHBOARD_STATS_API}
              query={query}
              userList={userList}
              modelList={modelList}
              disabledDate={true}
              handleDateChange={handleDateChange}
              handleUsersChange={handleUsersChange}
              handleModelsChange={handleModelsChange}
              handleExport={handleExport}
            ></FilterBar>
          </div>
          <RequestTokenInner
            requestData={usageData?.requestTokenData.requestData}
            xAxisData={usageData?.requestTokenData.xAxisData}
            tokenData={usageData?.requestTokenData.tokenData}
          ></RequestTokenInner>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} style={{ margin: 0 }}>
          <div
            style={{ margin: maxWidth < breakpoints.xl ? '26px 0' : '32px 0' }}
          >
            <TitleWrapper>
              {intl.formatMessage({ id: 'dashboard.topusers' })}
            </TitleWrapper>
          </div>
          <TopUser
            userData={topUserData.userData}
            topUserList={topUserData.topUserList}
          ></TopUser>
        </Col>
      </Row>
    </>
  );
};

export default UsageInner;
