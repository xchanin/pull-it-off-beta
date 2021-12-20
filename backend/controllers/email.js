const Email = require('../models/email');
const nodeMailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

exports.SendGridMail = (req, res, next) => {
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
            <ul>
                <li>Name: ${ req.body.name }</li>
                <li>Email: ${ req.body.email }</li>
            </ul>
        <h3>Message</h3>
        <p>${ req.body.message }</p>
    `

    const msg = {
        to: process.env.EMAIL_TO,
        from: process.env.EMAIL_FROM,
        subject: 'Website contact message',
        text: 'ds',
        html: output,
    }

    sgMail
    .send(msg)
    .then(() => {
        res.status(201).json({
            message: 'Contact message sent',
        });

    })
    .catch((error) => {
        console.error(error)
        res.status(500).json({
            message: 'Message failed!'
        })
    })
};
