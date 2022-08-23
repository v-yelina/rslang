export const formatPageDataForSlice = (data: string): string => (Number(data) - 1).toString();
export const formatPageDataForUI = (data: string): string => (Number(data) + 1).toString();

export const checkSearchParamsCorrect = (group: string | null, page: string | null) =>
  // eslint-disable-next-line
  group && page && Number(group) > 0 && Number(page) > 0 && Number(group) < 7 && Number(page) < 31;

export const SEARCH_INITIAL_GROUP = '1';
export const SEARCH_INITIAL_PAGE = '1';
