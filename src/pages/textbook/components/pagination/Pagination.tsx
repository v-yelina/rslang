import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  selectCurrentGroup,
  selectCurrentPage,
  setCurrentPageData,
} from '../../../../store/slices/textbook';
import { WORDS_PER_GROUP, WORDS_PER_PAGE } from '../../../../constants';
import { formatPageDataForSlice, formatPageDataForUI } from '../../helpers';

import './pagination.scss';

const PaginationBlock: FC = () => {
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const currentGroup = useAppSelector(selectCurrentGroup);
  const currentPage = useAppSelector(selectCurrentPage);
  const pageNumUI = Number(currentPage) + 1;

  const onPageChange: PaginationProps['onChange'] = (page: number) => {
    setSearchParams({
      group: formatPageDataForUI(currentGroup),
      page: page.toString(),
    });
    const newPageData = {
      page: formatPageDataForSlice(page.toString()),
      group: currentGroup,
    };
    dispatch(setCurrentPageData(newPageData));
  };

  return (
    <Pagination
      current={pageNumUI}
      onChange={onPageChange}
      pageSize={WORDS_PER_PAGE}
      total={WORDS_PER_GROUP}
      showSizeChanger={false}
    />
  );
};

export default PaginationBlock;
