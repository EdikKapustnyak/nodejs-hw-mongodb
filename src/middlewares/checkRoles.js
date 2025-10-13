import createHttpError from "http-errors";
import { ContactsCollection } from "../db/model/contacts.js";
import { ROLES } from "../constants/roles.js";


export const checkRoles = (...allowedRoles) => async (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      return next(createHttpError(401, "Not authorized"));
    }

    const { role } = user;

    // ✅ 1. If the admin role is allowed, skip it immediately.
    if (allowedRoles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      return next();
    }

    // ✅ 2. If the user role is allowed, we check the contact owner.
    if (allowedRoles.includes(ROLES.USER) && role === ROLES.USER) {
      const { contactId } = req.params;

      if (!contactId) {
        return next(createHttpError(403, "Access denied (no contactId)"));
      }

      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (!contact) {
        return next(createHttpError(403, "You don't have access to this contact"));
      }

      return next();
    }

    // ✅ 3. If the role is not suitable, it is a ban.
    return next(createHttpError(403, "Access denied"));
  } catch (error) {
    next(error);
  }
};
