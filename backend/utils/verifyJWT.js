const { errorHandler, makeErrorObject } = require('./handleError');
const jwt = require('jsonwebtoken');

async function verifyJWT(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) throw makeErrorObject('Token not found', 401);
        const userData = await jwt.verify(token,'3c3496e9de0640d8add7ebd968ce42f441ccfeae4f576b678afc8e25365d86c1');
        req.userData = userData;
        next();
    }
    catch (error) {
        errorHandler(error, res);
    }

}

module.exports = { verifyJWT };

// process.env.JWT_SECRET