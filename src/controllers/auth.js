import { ONE_DAY } from "../constants/index.js";
import { loginUser, refreshUserSession, registerUser } from "../services/auth.js";

export const registerUserController = async (req, res) => { 
    const user = await registerUser(req.body);

    res.json({
        status: 200,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async (req, res) => { 
    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expiers: new Date(Date.new() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, { 
        httpOnly: true,
        expiers:  new Date(Date.new() + ONE_DAY),
    });
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: { 
            accessToken: session.accessToken,
        },
    });
};

export const logoutUserController = async (req, res) => { 
    if (req.cookie.sessionId) {
        await loginUser(req.cookie.sessionId);
    };

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(200).send();
};

const setupSession = async (res, session) => {
    res.cookie('refreshToken', session.refreshToken, { 
        httpOnly: true,
        expiers: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session.sessionId, {
        httpOnly: true,
        expiers: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserSessionController = async (req, res) => { 
    const session = await refreshUserSession({ 
        sessionId: req.cookie.sessionId,
        refreshToken: req.cookie.refreshToken
    });

    setupSession();

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        accessToken: session.accessToken,
    });
};