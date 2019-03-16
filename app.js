const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const app = express();
//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res) => {
    const output = ` 
    <p>You have a new request from your portfolio page</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3><p>${req.body.message}</p> `;

      let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER, 
          pass: process.env.PASS 
        },
        tls:{
            rejectUnauthorized: false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"My Portfolio" <postmaster@lesliezavarella.com>', // sender address
        to: "lazav2021@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          res.render('contact', {msg: "Your email has been sent. Thanks for contacting me. I will respond as soon as possible."});
      });
    
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));