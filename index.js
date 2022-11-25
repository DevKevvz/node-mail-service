const express = require('express');
const http = require('http');
const nodemailer = require('nodemailer')
const cors = require("cors")

const app = express();
const server = http.Server(app); 
const port = 3000; 

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use( cors() )

app.get('/', function (req, res){
    res.json({
        ok: true,
        msg: 'Hello people!'
    })
});

app.post('/send_mail', function(req, res){
    const from = 'YOUR_EMAIL';
    const to = req.body.to;
    const subject = req.body.subject;
    //THIS JUST A HTML EXAMPLE, YOU ARE ABLE TO CHANGE WHATEVER YOU WANT AND NEED
    const message = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
    </html>`;

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'YOUR_EMAIL',
            pass: 'YOUR_PASSWORD'
        }
    });

    const mailOptions = {
        from: from,
        to: to, 
        subject: subject, 
        html: message
    }; 

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({
                ok: false,
                msg: 'Mail cannot be sended!'
            })
        }else{
            res.json({
                ok: true,
                msg: 'Mail sended ' + info.response
            })
        }
    })
})

server.listen(port, function(){
    console.log('Server up on port '+ port);
});
console.clear();