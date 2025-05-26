import CardWrapper from '@/components/card-wrapper';
import PieChart from '@/components/echarts/pie-chart';
import breakpoints from '@/config/breakpoints';
import useWindowResize from '@/hooks/use-window-resize';
import { useIntl } from '@umijs/max';
import { Col, Row,Tabs,ConfigProvider } from 'antd';
import _ from 'lodash';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { DashboardContext } from '../config/dashboard-context';
import styles from './system-load-chat.less';

const strokeColorFunc = (percent: number) => {
  if (percent <= 50 || percent === undefined) {
    return 'rgb(84, 204, 152, 80%)';
  }
  if (percent <= 80) {
    return 'rgba(250, 173, 20, 80%)';
  }
  return 'rgba(255, 77, 79, 80%)';
};

const SystemLoad = () => {
  const intl = useIntl();
  const data = useContext(DashboardContext)?.system_load?.current || {};
  console.log('data', useContext(DashboardContext));
  const { size } = useWindowResize();
  const [paddingRight, setPaddingRight] = useState<string>('20px');
  const [smallChartHeight, setSmallChartHeight] = useState<number>(190);
  const [largeChartHeight, setLargeChartHeight] = useState<number>(400);

  const chartData = useMemo(() => {
    return {
      gpu: {
        data: _.round(data.gpu || 0, 1),
        color: strokeColorFunc(data.gpu)
      },
      vram: {
        data: _.round(data.vram || 0, 1),
        color: strokeColorFunc(data.vram)
      },
      cpu: {
        data: _.round(data.cpu || 0, 1),
        color: strokeColorFunc(data.cpu)
      },
      ram: {
        data: _.round(data.ram || 0, 1),
        color: strokeColorFunc(data.ram)
      }
    };
  }, [data]);

  useEffect(() => {
    if (size.width < breakpoints.xl) {
      setPaddingRight('0');
    } else {
      setPaddingRight('20px');
    }
  }, [size.width]);

  return (
    <div>
      <div className={styles['system-box']}>
        <ConfigProvider theme={{
          components: {
            Tabs: {
              itemColor: '#767676',             // 标签文字颜色
              itemSelectedColor: '#000000',      // 标签文字选中颜色
              inkBarColor: '#000000',            // 下划线颜色
            },
          },
        }}>
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab={intl.formatMessage({id: 'dashboard.vramutilization'})} key="1">
              <PieChart
                title={intl.formatMessage({
                  id: 'dashboard.vramutilization'
                })}
                height={smallChartHeight}
                color={chartData.vram.color}
                value={chartData.vram.data}
              ></PieChart>
            </Tabs.TabPane>
            <Tabs.TabPane tab={intl.formatMessage({id: 'dashboard.gpuutilization'})} key="2">
              <PieChart
                height={smallChartHeight}
                value={chartData.gpu.data}
                color={chartData.gpu.color}
                title={intl.formatMessage({
                  id: 'dashboard.gpuutilization'
                })}
              ></PieChart>
            </Tabs.TabPane>
            <Tabs.TabPane tab={intl.formatMessage({id: 'dashboard.cpuutilization'})} key="3">
              <PieChart
                title={intl.formatMessage({id: 'dashboard.cpuutilization'})}
                height={smallChartHeight}
                color={chartData.cpu.color}
                value={chartData.cpu.data}
              ></PieChart>
            </Tabs.TabPane>
            <Tabs.TabPane tab={intl.formatMessage({id: 'dashboard.memoryutilization'})} key="4">
              <PieChart
                title={intl.formatMessage({
                  id: 'dashboard.memoryutilization'
                })}
                height={smallChartHeight}
                color={chartData.ram.color}
                value={chartData.ram.data}
              ></PieChart>
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default memo(SystemLoad);
