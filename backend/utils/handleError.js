function errorHandler(error, res) {
    if (error instanceof Error) {
        console.error(error.message);
        return res.status(error.statusCode || 500).json({ message: error.message, success: false });
    } else {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong!', success: false });
    }
}

function makeErrorObject(message, statusCode = 500) {
    const newError = new Error(message);
    newError.statusCode = statusCode;
    return newError;
}

module.exports = { errorHandler, makeErrorObject };