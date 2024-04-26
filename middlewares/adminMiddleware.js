function adminMiddleware(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next(); // user is an admin, proceed to the next middleware
    } else {
        res.status(403).send('Permission denied.'); // user is not an admin, send a forbidden response
    }
}

module.exports = adminMiddleware;
