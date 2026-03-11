import { useIntl } from '@umijs/max';
import dayjs from 'dayjs';
import { FC, useContext, useMemo } from 'react';
import { baseColorMap } from '../../config';
import { DashboardContext } from '../../config/dashboard-context';
import styles from './index.less';
import RequestTokenInner from './request-token-inner';

const generateValueMap = (list: { timestamp: number; value: number }[]) =>
  new Map(
    list.map((item) => [
      dayjs(item.timestamp * 1000).format('YYYY-MM-DD'),
      item.value
    ])
  );

const generateData = (dates: string[], valueMap: Map<string, number>) =>
  dates.map((date) => ({ time: date, value: valueMap.get(date) || 0 }));

const getLast30Days = () => {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    dates.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
  }
  return dates;
};

const UsageInner: FC<{ maxWidth: number }> = ({ maxWidth }) => {
  const intl = useIntl();
  const { model_usage } = useContext(DashboardContext);

  const requestTokenData = useMemo(() => {
    const data = model_usage || {};
    const completionTokenHistory = data.completion_token_history || [];
    const promptTokenHistory = data.prompt_token_history || [];
    const apiRequestHistory = data.api_request_history || [];
    const dateRange = getLast30Days();

    if (!completionTokenHistory.length) {
      return { requestData: [], tokenData: [], xAxisData: [] };
    }

    const requestList = {
      name: 'API requests',
      areaStyle: { color: 'rgba(13,171,219,0.15)' },
      color: baseColorMap.baseR1,
      data: generateData(dateRange, generateValueMap(apiRequestHistory))
    };

    const completionDataList = generateData(
      dateRange,
      generateValueMap(completionTokenHistory)
    );
    const promptDataList = generateData(
      dateRange,
      generateValueMap(promptTokenHistory)
    );

    const completionData = {
      name: 'Completion tokens',
      color: baseColorMap.base,
      data: completionDataList.map((item, index) => ({
        ...item,
        itemStyle: {
          borderRadius: !promptDataList[index].value
            ? [2, 2, 0, 0]
            : [0, 0, 0, 0]
        }
      }))
    };
    const promptData = {
      name: 'Prompt tokens',
      color: baseColorMap.baseR3,
      data: promptDataList.map((item) => ({
        ...item,
        itemStyle: { borderRadius: [2, 2, 0, 0] }
      }))
    };

    return {
      requestData: [requestList],
      tokenData: [completionData, promptData],
      xAxisData: dateRange
    };
  }, [model_usage]);

  return (
    <>
      <div className={styles['line-box']}>
        <p className={styles['title']}>
          {intl.formatMessage({ id: 'dashboard.usage' })}
        </p>
        <div style={{ width: '100%', padding: ' 0 10px 10px 10px' }}>
          <RequestTokenInner
            requestData={requestTokenData?.requestData}
            xAxisData={requestTokenData?.xAxisData}
            tokenData={requestTokenData?.tokenData}
          ></RequestTokenInner>
        </div>
      </div>
      {/* <PageTools
        style={{ margin: '26px 0px' }}
        left={
          <span className="font-700">
            {intl.formatMessage({ id: 'dashboard.usage' })}
          </span>
        }
      />
      <Row style={{ width: '100%' }} gutter={[0, 20]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={16}
          style={{
            paddingRight: maxWidth < breakpoints.xl ? 0 : 20
          }}
        >
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
      </Row> */}
    </>
  );
};

export default UsageInner;
