import { queryClusterList } from '@/pages/cluster-management/apis';
import { BaseSelect, CardWrapper, PageTools } from '@gpustack/core-ui';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import { memo, useContext, useEffect, useState } from 'react';
import { sectionHeadingStyle, sectionTitleStyle } from '../config';
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
          style={sectionHeadingStyle}
          left={
            <span style={sectionTitleStyle}>
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
        {/* The trend chart takes the full row. The GPU / VRAM / CPU / memory
            gauges that shared this row are hidden for now — see the commented
            block below. `align="stretch"` is kept on the Row so restoring them
            needs no further layout work: the trend chart then sets the row's
            height and the gauge card takes 100% of it. */}
        <Row gutter={[20, 20]} align="stretch">
          <Col span={24}>
            <CardWrapper style={{ height: resourceChartHeight }}>
              <ResourceUtilization data={systemLoadData?.history} />
            </CardWrapper>
          </Col>
          {/* <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <CardWrapper style={{ height: '100%' }}>
              The gauges' breakpoints run OPPOSITE to the usual direction,
              because it is the PARENT that widens as the viewport narrows:
              at `xl` this card is a third of the row, so 2x2 is right, and
              below `xl` it goes full width, where 2x2 left each 175px gauge
              floating in ~400px of dead space and doubled the page's
              scroll length. Four across is the dense arrangement, and it
              belongs to the WIDER card, not the wider window.
              Under `md` the window itself is too narrow for four, so it
              falls back to 2x2.
              <Row>
                <Col
                  xs={12}
                  md={6}
                  xl={12}
                  style={{ height: smallChartHeight }}
                >
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.gpuutilization'
                    })}
                    value={chartData.gpu.data}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  xl={12}
                  style={{ height: smallChartHeight }}
                >
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.vramutilization'
                    })}
                    value={chartData.vram.data}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  xl={12}
                  style={{ height: smallChartHeight }}
                >
                  <GaugeChart
                    height={smallChartHeight}
                    title={intl.formatMessage({
                      id: 'dashboard.cpuutilization'
                    })}
                    value={chartData.cpu.data}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  xl={12}
                  style={{ height: smallChartHeight }}
                >
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
