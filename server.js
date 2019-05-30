const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const nodemailer = require('nodemailer');

const details = require('./config/details');

const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
.connect(db)
.then(() => console.log('MongoDB Connected'))
.catch(err =>console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

app.post('/api/form1', (req,res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
     <h3>Submitted SC/ST Grievance</h3>
     <ul>
       <li>Name: ${req.body.name}</li>
       <li>Email: ${req.body.email}</li>
       <li>Roll No.: ${req.body.number}</li>
       <li>Phone Number: ${req.body.phoneNumber}</li>
       <li>Address: ${req.body.address}</li>
       <li>Department: ${req.body.department}</li>
       <li>Year: ${req.body.year}</li>
     </ul>
     <h3>Message: </h3>
     <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: details.email,
        pass: details.password
      }
    });
    let mailOptions = {
      from: 'AIACTR- SC/ST GRIEVANCE',
      to: 'sharmaprince2271997@gmail.com',
      replyTo: req.body.email,
      subject: 'New Message',
      text: req.body.message,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return console.log(err);
      }

      console.log('Message Sent: %s', info.messageId);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    })
  })
});

app.post('/api/form2', (req,res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
     <h3>Submitted Student Grievance</h3>
     <ul>
       <li>Name: ${req.body.name}</li>
       <li>Email: ${req.body.email}</li>
       <li>Roll No.: ${req.body.number}</li>
       <li>Phone Number: ${req.body.phoneNumber}</li>
       <li>Address: ${req.body.address}</li>
       <li>Department: ${req.body.department}</li>
       <li>Year: ${req.body.year}</li>
     </ul>
     <h3>Message: </h3>
     <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: details.email,
        pass: details.password
      }
    });
    let mailOptions = {
      from: 'AIACTR- STUDENT GRIEVANCES',
      to: 'sharmaprince2271997@gmail.com',
      replyTo: req.body.email,
      subject: 'New Message',
      text: req.body.message,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return console.log(err);
      }

      console.log('Message Sent: %s', info.messageId);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    })
  })
});


app.post('/api/form3', (req,res) => {
    const htmlEmail = `
     <h3>Submitted Internal Grievance</h3>
     <ul>
       <li>Name: ${req.body.name}</li>
       <li>Email: ${req.body.email}</li>
       <li>Roll No.: ${req.body.number}</li>
       <li>Phone Number: ${req.body.phoneNumber}</li>
       <li>Address: ${req.body.address}</li>
       <li>Department: ${req.body.department}</li>
       <li>Year: ${req.body.year}</li>
     </ul>
     <h3>Message: </h3>
     <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: details.email,
        pass: details.password
      }
    });
    let mailOptions = {
      from: 'AIACTR- INTERNAL GRIEVANCES',
      to: 'sharma.prince69@yahoo.com',
      replyTo: req.body.email,
      subject: 'New Message',
      text: req.body.message,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return console.log(err);
      }

      console.log('Message Sent: %s', info.messageId);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    })
  })

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server running on port ${port}`));
