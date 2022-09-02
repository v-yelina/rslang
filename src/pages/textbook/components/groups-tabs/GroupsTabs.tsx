import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { ReadFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { SEARCH_INITIAL_PAGE, WORDS_GROUPS } from '../../../../constants';
import { setCurrentPageData, selectCurrentGroup } from '../../../../store/slices/textbook';
import { selectIsLogged } from '../../../../store/slices/auth';
import { formatPageDataForSlice, formatPageDataForUI } from '../../helpers';

import './groups-tabs.scss';

const { TabPane } = Tabs;

const GroupsTabs: FC = () => {
  // eslint-disable-next-line
  const [_, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const group = useAppSelector(selectCurrentGroup);
  const isLogged = useAppSelector(selectIsLogged);

  const onGroupChange = (groupKey: string) => {
    setParams({ group: groupKey, page: SEARCH_INITIAL_PAGE });
    const newPageData = {
      page: formatPageDataForSlice(SEARCH_INITIAL_PAGE),
      group: formatPageDataForSlice(groupKey),
    };
    dispatch(setCurrentPageData(newPageData));
  };

  return (
    <div className="group-tabs-container">
      <Tabs defaultActiveKey={formatPageDataForUI(group)} onChange={onGroupChange}>
        {[...WORDS_GROUPS].map((groupIndex) => (
          <TabPane
            key={groupIndex}
            tab={
              <span>
                <ReadFilled />
                Group
                {` ${groupIndex}`}
              </span>
            }
            className="group-tab"
          />
        ))}
        {isLogged && <TabPane key={7} tab="Difficult Words" />}
      </Tabs>
    </div>
  );
};

export default GroupsTabs;
