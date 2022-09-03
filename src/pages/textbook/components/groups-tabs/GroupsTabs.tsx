import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { FolderFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { SEARCH_INITIAL_PAGE, WORDS_GROUPS } from '../../../../constants';
import { selectCurrentGroup, setCurrentPageData } from '../../../../store/slices/textbook';
import { formatPageDataForSlice, formatPageDataForUI } from '../../helpers';
import { selectIsLogged } from '../../../../store/slices/auth';

import './groups-tabs.scss';

const GroupsTabs: FC = () => {
  // eslint-disable-next-line
  const [_, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const group = useAppSelector(selectCurrentGroup);
  const currentGroup = formatPageDataForUI(group);
  const isLogged = useAppSelector(selectIsLogged);

  const onGroupChange = (e: RadioChangeEvent) => {
    const groupKey = e.target.value.toString();
    setParams({ group: groupKey, page: SEARCH_INITIAL_PAGE });
    const newPageData = {
      page: formatPageDataForSlice(SEARCH_INITIAL_PAGE),
      group: formatPageDataForSlice(groupKey),
    };
    dispatch(setCurrentPageData(newPageData));
  };

  return (
    <div className="group-tabs-container">
      <Radio.Group onChange={onGroupChange} defaultValue={currentGroup}>
        {[...WORDS_GROUPS].map((groupIndex) => (
          // eslint-disable-next-line
          <Radio.Button
            value={groupIndex.toString()}
            key={groupIndex}
            className={`tab-group-${groupIndex}`}
          >
            <FolderFilled className="tab-icon" />
            <span className="group-label">
              GROUP
              {` ${groupIndex}`}
            </span>
            <span className="group-label--mobile">{groupIndex}</span>
          </Radio.Button>
        ))}
        {isLogged && (
          <Radio.Button value="7" key="7" className="tab-group-7">
            <FolderFilled className="tab-icon" />
            <span className="group-label">DIFFICULT</span>
            <span className="group-label--mobile">!</span>
          </Radio.Button>
        )}
      </Radio.Group>
    </div>
  );
};

export default GroupsTabs;
