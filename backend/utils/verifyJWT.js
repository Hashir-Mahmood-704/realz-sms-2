const { errorHandler, makeErrorObject } = require('./handleError');
const jwt = require('jsonwebtoken');

async function verifyJWT(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) throw makeErrorObject('Token not found', 401);
        const userData = await jwt.verify(token, process.env.JWT_SECRET);
        req.userData = userData;
        next();
    }
    catch (error) {
        errorHandler(error, res);
    }

}

module.exports = { verifyJWT };