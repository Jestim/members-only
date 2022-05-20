exports.logOutGet = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        }

        res.redirect('/');
    });
};