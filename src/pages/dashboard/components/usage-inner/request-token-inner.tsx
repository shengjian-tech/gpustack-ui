import CardWrapper from '@/components/card-wrapper';
import { SimpleCard } from '@/components/card-wrapper/simple-card';
import MixLineBar from '@/components/echarts/mix-line-bar';
import { formatLargeNumber } from '@/utils';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import styles from './index.less';
import styled from 'styled-components';
import { baseColorMap } from '../../config';

const DownloadButton = styled(Button).attrs({
  className: 'download-button'
})`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  display: none;
`;

const CardWrapperBox = styled.div`
  &:hover {
    .download-button {
      display: flex;
    }
  }
`;

interface RequestTokenInnerProps {
  requestData: {
    name: string;
    color: string;
    areaStyle: any;
    data: { time: string; value: number }[];
  }[];
  tokenData: {
    data: { time: string; value: number }[];
  }[];
  xAxisData: string[];
  overViewData?: {
    requestCount: number;
    completionCount: number;
    promptCount: number;
  };
}

const labelFormatter = (v: any) => {
  return dayjs(v).format('MM-DD');
};

const dataList = [
  {
    label: '0',
    value: 'Completion Tokens',
    key: 'completionCount',
    iconType: 'roundRect',
    color: baseColorMap.base
  },
  {
    label: '0',
    value: 'Prompt Tokens',
    key: 'promptCount',
    iconType: 'roundRect',
    color: baseColorMap.baseR3
  },
  {
    label: '0',
    value: 'API Requests',
    key: 'requestCount',
    iconType: 'circle',
    color: baseColorMap.baseR1
  }
];

const legendData = [
  { name: 'Completion tokens', icon: 'roundRect' },
  { name: 'Prompt tokens', icon: 'roundRect' },
  { name: 'API requests', icon: 'circle' }
];

const RequestTokenInner: React.FC<RequestTokenInnerProps> = (props) => {
  const { requestData, tokenData, xAxisData } = props;
  console.log('---requestData---', requestData);
  const intl = useIntl();

  return (
    <>
      <div className={styles['usage-box']}>
        <div className={styles['tab-title']}>
          <div className={styles['flex1']}>{intl.formatMessage({ id: 'dashboard.apirequest' })}</div>
          <div className={styles['flex1']}>{intl.formatMessage({ id: 'dashboard.tokens' })}</div>
        </div>
        <Row>
          <Col span={12}>
            <LineChart
              seriesData={requestData}
              xAxisData={xAxisData}
              height={360}
              labelFormatter={labelFormatter}
            ></LineChart>
          </Col>
          <Col span={12}>
            <BarChart
              seriesData={tokenData}
              xAxisData={xAxisData}
              height={360}
              labelFormatter={labelFormatter}
            ></BarChart>
          </Col>
        </Row>
      </div>
      
      {/* <CardWrapper style={{ width: '100%' }}>
        <Row style={{ width: '100%' }}>
          <Col span={12}>
            <LineChart
              title={intl.formatMessage({ id: 'dashboard.apirequest' })}
              seriesData={requestData}
              xAxisData={xAxisData}
              height={360}
              labelFormatter={labelFormatter}
            ></LineChart>
          </Col>
          <Col span={12}>
            <BarChart
              title={intl.formatMessage({ id: 'dashboard.tokens' })}
              seriesData={tokenData}
              xAxisData={xAxisData}
              height={360}
              labelFormatter={labelFormatter}
            ></BarChart>
          </Col>
        </Row>
      </CardWrapper> */}
    </>
    
  );
};

export default RequestTokenInner;
