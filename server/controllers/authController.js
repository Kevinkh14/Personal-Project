const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: function(req, res) {
        const {username, password, email, isAdmin} = req.body;
        const db = req.app.get("db");
        db.checkForUsername(username, email).then(count => {
            if(+count[0].count === 0) {
                bcrypt.hash(password, 12).then(hash => {
                    db.register(username, hash, email, isAdmin).then(() => {
                        req.session.user = {
                            username,
                            email,
                            isAdmin
                        }
                        res.status(200).json(req.session.user);
                    })
                })
            } else {
                res.status(409).json({
                    error: "Username or Email already Exists. Please Log in with your account"
                })
            }
        })
    },
    loginUser: function(req, res) {
        const {username, password} = req.body;
        const db = req.app.get("db");
        db.getPasswordViaUsername(username).then(user => {
            let hash = user[0].password;
            console.log(user[0]);
            bcrypt.compare(password, hash).then(areSame => {
                if(areSame) {
                    req.session.user = {
                        username,
                        email: user[0].email,
                        isAdmin: user[0].is_admin
                    }
                    res.status(200).json(req.session.user);
                } else {
                    res.status(401).json({
                        error: "Username or Password incorrect"
                    })
                }
            })
        })
    }
}