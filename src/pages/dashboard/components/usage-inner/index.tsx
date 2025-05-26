import PageTools from '@/components/page-tools';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import { FC, memo, useContext } from 'react';
import { DashboardContext } from '../../config/dashboard-context';
import RequestTokenInner from './request-token-inner';
import TopUser from './top-user';
import useUsageData from './use-usage-data';
import styles from './index.less';

const UsageInner: FC<{ paddingRight: string }> = ({ paddingRight }) => {
  const intl = useIntl();

  const { model_usage } = useContext(DashboardContext);

  const { requestTokenData, topUserData } = useUsageData(model_usage || {});
  console.log('---requestTokenData---', requestTokenData)

  return (
    <>
      <div className={styles['line-box']}>
        <p className={styles['title']}>{intl.formatMessage({ id: 'dashboard.usage' })}</p>
        <div style={{ width: '100%',padding:' 0 10px 10px 10px' }}>
          <RequestTokenInner
            requestData={requestTokenData.requestData}
            xAxisData={requestTokenData.xAxisData}
            tokenData={requestTokenData.tokenData}
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
          style={{ paddingRight: paddingRight }}
        >
          <RequestTokenInner
            requestData={requestTokenData.requestData}
            xAxisData={requestTokenData.xAxisData}
            tokenData={requestTokenData.tokenData}
          ></RequestTokenInner>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <TopUser
            userData={topUserData.userData}
            topUserList={topUserData.topUserList}
          ></TopUser>
        </Col>
      </Row> */}
    </>
  );
};

export default memo(UsageInner);
