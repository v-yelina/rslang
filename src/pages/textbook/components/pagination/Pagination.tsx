import React, { FC, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { useAppSelector } from '../../../../store/hooks';
import { selectCurrentPage } from '../../../../store/slices/textbook';
import { WORDS_PER_GROUP, WORDS_PER_PAGE } from '../../../../constants';

import './pagination.scss';

const PaginationBlock: FC = () => {
  const currentPage = useAppSelector(selectCurrentPage);
  const [current, setCurrent] = useState(Number(currentPage) + 1);
  const onPageChange: PaginationProps['onChange'] = (page: number) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <Pagination
      current={current}
      onChange={onPageChange}
      pageSize={WORDS_PER_PAGE}
      total={WORDS_PER_GROUP}
      showSizeChanger={false}
    />
  );
};

export default PaginationBlock;
