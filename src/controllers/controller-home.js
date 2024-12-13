module.exports = {
    home(req, res) {
        if (req.session.loggedin) {
            const username = req.session.username;
            res.render('home', {
                username: username,
                url: 'http://localhost:5050/',
                showNavbar: true, 
                currentPage: 'home'
            });
        } else {
            res.redirect('/login');
        }
    }
};
