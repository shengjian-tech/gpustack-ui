import Chart from '@/components/echarts/chart';
import useChartConfig from '@/components/echarts/config';
import EmptyData from '@/components/empty-data';
import React, { memo } from 'react';
import { ChartProps } from './types';
import styles from './piechart.less';
import _ from 'lodash';
import { useIntl } from '@umijs/max';

const PieChart: React.FC<Omit<ChartProps, 'seriesData' | 'xAxisData'>> = (
  props
) => {
  const {
    pieItemConfig,
    title: titleConfig,
    chartColorMap
  } = useChartConfig();
  const intl = useIntl();
  const { value, height, width, labelFormatter, title, color } = props;
  if (!value && value !== 0) {
    return <EmptyData height={height} title={title}></EmptyData>;
  }

  const setDataOptions = () => {
    return {
      title: {
      text: `${value}%`,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    series: [
      {
        ...pieItemConfig,
        data: [
          {
            value: value,
            name: '当前已占用',
            itemStyle: {
              color: '#0005EB'
            }
          },
          {
            value: 100 - value,
            name: '剩余可使用',
            itemStyle: {
              color: '#F3F3FF'
            }
          }
        ]
      }
    ]
    };
  };

  const dataOptions: any = setDataOptions();

  return (
    <>
      <div className={styles['pie-box']}>
        <Chart
          height={height}
          options={dataOptions}
          width={width || '240px'}
        ></Chart>
        <div className={styles['pie-title']}>
          <p>{intl.formatMessage({id: 'dashboard.usage.situation'})}</p>
          <ul className={styles['pie-details']}>
            <li>
              <span>{intl.formatMessage({id: 'dashboard.currently.occupied'})}</span>
              <span>{ value }%</span>
            </li>
            <li>
              <span>{intl.formatMessage({id: 'dashboard.surplus.use'})}</span>
              <span>{_.round(100 - value , 2) }%</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(PieChart);
