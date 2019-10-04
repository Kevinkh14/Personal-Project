const bcrypt = require('bcryptjs')
const nodemailer =require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});
module.exports = {
    registerUser: function(req, res) {
        const {username, password, email, isAdmin, avatar} = req.body;
        const db = req.app.get("db");
        db.checkForUsername(username, email).then(count => {
            if(+count[0].count === 0) {
                bcrypt.hash(password, 12).then(hash => {
                    db.register(username, hash, email, isAdmin, avatar).then(() => {
                        let mailOptions ={
                            from: '"worp.space"<kevinsemail14@gmail.com>',
                            to: email,
                            subject:'Thanks For Registering On worp',
                            text:'Worp',
                            html: `<b>
                                <div>
                                    <h1>Thanks for Registering with Worp</h1>
                                </div>
                            </b>`
                        }
                        req.session.user = {
                            username,
                            email,
                            isAdmin,
                            avatar,
                            mailOptions
                        }
                        transporter.sendMail(mailOptions)
                            .then((response)=>{
                                console.log('email Sent')
                            })
                            .catch((err)=>{
                                console.log('error',err)
                            })
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
            let hash = user[0].hash;
            console.log(user[0]);
            bcrypt.compare(password, hash).then(areSame => {
                if(areSame) {
                    req.session.user = {
                        id:user[0].id,
                        username,
                        email: user[0].email,
                        avatar:user[0].avatar
                    }
                    res.status(200).json(req.session.user);
                    
                } else {
                    res.status(401).json({
                        error: "Username or Password incorrect"
                    })
                }
            })
        })
    },
    logOut: function(req,res){
        req.session.destroy();
        return res.sendStatus(200)
    }
}
