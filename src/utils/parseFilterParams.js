const parseName = (name) => { 
    if (typeof name === 'string' && name.trim().length > 0) {
      return name.trim();
    }
    return;
  };
  
  const parseIsFavourite = (isFavourite) => { 
    if (typeof isFavourite === 'string') {
      if (isFavourite.toLowerCase() === 'true') return true;
      if (isFavourite.toLowerCase() === 'false') return false;
    }
    if (typeof isFavourite === 'boolean') return isFavourite;
    return;
  };
  
  const parseContactType = (type) => {
    const allowedTypes = ['work', 'home', 'personal'];
    if (typeof type === 'string' && allowedTypes.includes(type)) {
      return type;
    }
    return;
  };
  
  export const parseFilterParams = (query) => {
    const { name, isFavourite, type } = query;
  
    const parsedName = parseName(name);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    const parsedContactType = parseContactType(type);
  
    return { 
      name: parsedName,
      isFavourite: parsedIsFavourite,
      contactType: parsedContactType
    };
  };
  