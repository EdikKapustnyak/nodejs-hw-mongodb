const parseName = (name) => { 
    const isString = typeof name === 'string';
    if (!isString) return;
};

const parseisFavourite = (isFavourite) => { 
    if (typeof isFavourite === 'string') {
        if (isFavourite.toLowerCase() === 'true') return true;
        if (isFavourite.toLowerCase() === 'false') return false;
    }
    if (typeof isFavourite === 'boolean') return isFavourite;

    return;
};

export const parseFilterParams = (query) => {
    const {name, isFavourite} = query;

    const parsedName = parseName(name);
    const parsedisFavourite = parseisFavourite(isFavourite);

    return { 
        name: parsedName,
        isFavourite: parsedisFavourite
    };
};