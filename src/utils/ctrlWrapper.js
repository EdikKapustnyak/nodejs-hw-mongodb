export const ctrlWrapper = (controllers) => { 
    return async (req, res, next) => { 
        try {
            await controllers(req, res, next);
        } catch(err) { 
            next(err);
        }
    };
};