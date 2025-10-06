import { SORT_ORDER } from "../index.js";

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if (isKnownOrder) return isKnownOrder;
    return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
    const keysOfContact = [
        '_id',
        'name',
        'phoneNumber',
        'email',
        'isFavourite',
        'contactType',
        'createdAt',
        'updatedAt',
    ];
    return keysOfContact.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
    const {sortOrder, sortBy} = query;
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);

    return { 
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy
    };
};