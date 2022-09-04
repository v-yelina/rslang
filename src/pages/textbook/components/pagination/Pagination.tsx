import React, { FC, useState } from 'react';
import { Button, Input } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { TrophyFilled } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { WORDS_PER_GROUP, WORDS_PER_PAGE } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  selectCurrentGroup,
  selectCurrentPage,
  selectIsPageLearned,
  setCurrentPageData,
} from '../../../../store/slices/textbook';
import { formatPageDataForSlice, formatPageDataForUI } from '../../helpers';

import './pagination.scss';

type PageType = 'current' | 'prev' | 'next' | 'first' | 'last';

const PaginationBlock: FC = () => {
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const currentGroup = useAppSelector(selectCurrentGroup);
  const currentPage = useAppSelector(selectCurrentPage);
  const pageNumUI = Number(currentPage) + 1;
  const lastPage = WORDS_PER_GROUP / WORDS_PER_PAGE;
  const isPageLearned = useAppSelector(selectIsPageLearned);

  const [pageSearchValue, setPageSearchValue] = useState('');

  const onPageChange = (newPage: number): void => {
    setSearchParams({
      group: formatPageDataForUI(currentGroup),
      page: newPage.toString(),
    });
    const newPageData = {
      page: formatPageDataForSlice(newPage.toString()),
      group: currentGroup,
    };
    dispatch(setCurrentPageData(newPageData));
  };

  const handlePageSearch = (): void => {
    let newPage: number;
    if (!Number(pageSearchValue) || Number(pageSearchValue) < 1 || Number(pageSearchValue) > 30) {
      newPage = 1;
    } else {
      newPage = Number(pageSearchValue);
    }
    onPageChange(newPage);
  };

  const handlePageClick = (pageBtnType: PageType): void => {
    let newPage: number;

    switch (pageBtnType) {
      case 'first':
        newPage = 1;
        break;
      case 'last':
        newPage = lastPage;
        break;
      case 'prev':
        newPage = pageNumUI - 1;
        break;
      case 'next':
        newPage = pageNumUI + 1;
        break;
      default:
        newPage = pageNumUI;
        return;
    }

    onPageChange(newPage);
  };

  return (
    <div className="textbook-pagination-wrapper">
      <ButtonGroup className="textbook-pagination">
        <Button disabled={pageNumUI === 1} onClick={() => handlePageClick('first')}>
          {'<<'}
        </Button>
        <Button disabled={pageNumUI === 1} onClick={() => handlePageClick('prev')}>
          {'<'}
        </Button>
        <Button onClick={() => handlePageClick('current')}>
          {isPageLearned && <TrophyFilled style={{ fontSize: '16px', color: '#ffbf00' }} />}
          <span>{`PAGE ${pageNumUI}`}</span>
        </Button>
        <Button disabled={pageNumUI === lastPage} onClick={() => handlePageClick('next')}>
          {'>'}
        </Button>
        <Button disabled={pageNumUI === lastPage} onClick={() => handlePageClick('last')}>
          {'>>'}
        </Button>
      </ButtonGroup>
      <div className="pagination-jump">
        <span>GO TO: </span>
        <Input
          defaultValue=""
          value={pageSearchValue}
          onChange={(e) => setPageSearchValue(e.target.value)}
          onPressEnter={handlePageSearch}
          style={{ width: '50px' }}
        />
      </div>
    </div>
  );
};

export default PaginationBlock;
