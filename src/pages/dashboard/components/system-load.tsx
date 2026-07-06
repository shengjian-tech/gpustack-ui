import { queryClusterList } from '@/pages/cluster-management/apis';
import { BaseSelect, CardWrapper, PageTools } from '@gpustack/core-ui';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import { memo, useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../config/dashboard-context';
import ResourceUtilization from './resource-utilization';

const resourceChartHeight = 400;

const SystemLoad = () => {
  const intl = useIntl();
  const { system_load, fetchData } = useContext(DashboardContext);
  const [systemLoadData, setSystemLoadData] = useState<any>(system_load || {});
  const [clusterList, setClusterList] = useState<Global.BaseOption<number>[]>(
    []
  );

  useEffect(() => {
    setSystemLoadData(system_load || {});
  }, [system_load]);

  const handleClusterChange = async (value?: number) => {
    try {
      const res: any = await fetchData(value ? { cluster_id: value } : {});
      setSystemLoadData(res?.system_load || {});
    } catch (error) {
      setSystemLoadData({});
    }
  };

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const res = await queryClusterList({ page: -1 });
        const options = res.items.map((cluster: any) => ({
          label: cluster.name,
          value: cluster.id
        }));
        setClusterList(options);
      } catch (error) {
        setClusterList([]);
      }
    };
    fetchClusters();
  }, []);

  return (
    <div>
      <div className="system-load">
        <PageTools
          style={{ margin: '26px 0px' }}
          left={
            <span className="font-700">
              {intl.formatMessage({ id: 'dashboard.systemload' })}
            </span>
          }
          right={
            <BaseSelect
              allowClear
              onChange={handleClusterChange}
              options={clusterList}
              placeholder={intl.formatMessage({
                id: 'clusters.filterBy.cluster'
              })}
              style={{ width: 360 }}
            />
          }
        />
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <CardWrapper style={{ height: resourceChartHeight }}>
              <ResourceUtilization data={systemLoadData?.history} />
            </CardWrapper>
          </Col>
          {/* <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <CardWrapper style={{ height: largeChartHeight }}>
              <Row style={{ height: largeChartHeight }}>
                <Col span={12} style={{ height: smallChartHeight }}>
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.gpuutilization'
                    })}
                    value={chartData.gpu.data}
                  />
                </Col>
                <Col span={12} style={{ height: smallChartHeight }}>
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.vramutilization'
                    })}
                    value={chartData.vram.data}
                  />
                </Col>
                <Col span={12} style={{ height: smallChartHeight }}>
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.cpuutilization'
                    })}
                    value={chartData.cpu.data}
                  />
                </Col>
                <Col span={12} style={{ height: smallChartHeight }}>
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.memoryutilization'
                    })}
                    value={chartData.ram.data}
                  />
                </Col>
              </Row>
            </CardWrapper>
          </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default memo(SystemLoad);
