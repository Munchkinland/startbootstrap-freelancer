const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/enviarCorreo', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tuCorreo@gmail.com',
            pass: 'tuClaveDeAplicacion'
        }
    });

    let mailOptions = {
        from: req.body.correo,
        to: 'tuCorreo@gmail.com',
        subject: `Mensaje de ${req.body.nombre}`,
        text: req.body.mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error al enviar el mensaje');
        } else {
            console.log('Mensaje enviado: %s', info.messageId);
            res.send('Mensaje enviado con éxito');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
