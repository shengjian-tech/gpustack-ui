import IconFont from '@/components/icon-font';
import HotKeys from '@/config/hotkeys';
import { modelCategoriesMap } from '@/pages/llmodels/config';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Space } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { queryModelsList } from './apis';
import GroundReranker from './components/ground-reranker';
import './style/play-ground.less';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-pro-page-container {
    background: white;
    border-radius: 10px;
    min-height: 600px;
    max-width: 1400px;
    margin:30px auto;
  }
  .page-tools,.seal-table-container {
    padding:0 30px
  }
`;

const PlaygroundRerank: React.FC = () => {
  const intl = useIntl();
  const groundLeftRef = useRef<any>(null);
  const groundRerankerRef = useRef<any>(null);
  const [rerankerModelList, setRerankerModelList] = useState<
    Global.BaseOption<string>[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  const handleViewCode = useCallback(() => {
    groundRerankerRef.current?.viewCode?.();
  }, [groundRerankerRef]);

  const handleToggleCollapse = useCallback(() => {
    groundRerankerRef.current?.setCollapse?.();
  }, [groundRerankerRef]);

  useEffect(() => {
    const getModelListByReranker = async () => {
      try {
        const params = {
          categories: modelCategoriesMap.reranker,
          with_meta: true
        };
        const res = await queryModelsList(params);
        const list = _.map(res.data || [], (item: any) => {
          return {
            value: item.id,
            label: item.id,
            meta: item.meta
          };
        }) as Global.BaseOption<string>[];
        return list;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    const fetchData = async () => {
      try {
        const [rerankerModelList] = await Promise.all([
          getModelListByReranker()
        ]);
        setRerankerModelList(rerankerModelList);
      } catch (error) {
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  const renderExtra = () => {
    return (
      <Space key="buttons">
        <Button
          size="middle"
          onClick={handleViewCode}
          icon={<IconFont type="icon-code" className="font-size-16"></IconFont>}
        >
          {intl.formatMessage({ id: 'playground.viewcode' })}
        </Button>
        <Button
          size="middle"
          onClick={handleToggleCollapse}
          icon={
            <IconFont
              type="icon-a-layout6-line"
              className="font-size-16"
            ></IconFont>
          }
        ></Button>
      </Space>
    );
  };

  useHotkeys(
    HotKeys.RIGHT.join(','),
    () => {
      groundLeftRef.current?.setCollapse?.();
    },
    {
      preventDefault: true
    }
  );

  return (
    <Wrapper>
      <PageContainer
        ghost
        header={{
          title: intl.formatMessage({ id: 'menu.playground.rerank' }),
          style: {
            paddingInline: 'var(--layout-content-header-inlinepadding)'
          },
          breadcrumb: {}
        }}
        extra={renderExtra()}
        className={classNames('playground-container chat')}
      >
        <div className="play-ground">
          <div className="chat">
            <GroundReranker
              ref={groundRerankerRef}
              modelList={rerankerModelList}
              loaded={loaded}
            ></GroundReranker>
          </div>
        </div>
      </PageContainer>
    </Wrapper>
  );
};

export default PlaygroundRerank;
