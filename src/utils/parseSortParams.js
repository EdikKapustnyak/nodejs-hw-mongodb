import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
  const normalized = sortOrder?.toLowerCase();
  if (normalized === SORT_ORDER.ASC || normalized === SORT_ORDER.DESC) {
    return normalized;
  }
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id', 'name', 'phoneNumber', 'email',
    'isFavourite', 'contactType', 'createdAt', 'updatedAt'
  ];
  return keysOfContact.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return { sortOrder: parsedSortOrder, sortBy: parsedSortBy };
};
