require('dotenv').config()
const nodemailer =require('nodemailer')
// const hbs = require ('nodemailer-express-handlebars')


//step 1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});
// transporter.use('compile',hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: './views'
// }))
//step 2
let mailOptions ={
    from: '"worp.space"<kevinsemail14@gmail.com>',
    to: 'kever14.kh@gmail.com',
    subject:'Thanks for Registering with Worp',
    text:'it works',
    html: `<b>
        <div>
            <h1>Thanks for Registering with Worp</h1>
        </div>
    </b>`
}
//step 3
transporter.sendMail(mailOptions)
    .then((response)=>{
        console.log('email Sent')
    })
    .catch((err)=>{
        console.log('error',err)
    })