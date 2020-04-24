const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;
    contentHTML = `
        <h1>Información enviada de la opción de Contacto</h1>
        <ul>
            <li>Cliente: ${nombre}</li>
            <li>Correo del Cliente: ${correo}</li>
            <li>Número de teléfono: ${telefono}</li>
        </ul>
        <p>${mensaje}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'noreply@fisdesigns.com',
        port: 465,
        secure: true,
        auth: {
            user: 'test@drone-ithouston.com',
            pass: 'Contraseña'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"fis designs" <noreply@fisdesigns.com>', // sender address,
        to: 'fisdesignsllc@gmail.com',
        subject: 'Contacto de un cliente',
        html: contentHTML
    });
    res.send({msg: 'enviado'})
    
    // .then(res.send({msg: 'enviado'}))
    // .catch(res.send({msg: 'error'}));

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

});

module.exports = router;