import { CardWrapper } from '@gpustack/core-ui';
import { HBarChart } from '@gpustack/core-ui/charts';
import React from 'react';

interface TopUserProps {
  userData: { name: string; value: number }[];
  topUserList: string[];
}
const TopUser: React.FC<TopUserProps> = (props) => {
  const { userData, topUserList } = props;

  return (
    <CardWrapper>
      <HBarChart
        seriesData={userData}
        xAxisData={topUserList}
        height={380}
        maxItems={10}
      ></HBarChart>
    </CardWrapper>
  );
};

export default TopUser;
