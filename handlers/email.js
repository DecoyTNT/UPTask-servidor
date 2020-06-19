const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: emailConfig.user, // generated ethereal user
            pass: emailConfig.pass, // generated ethereal password
        },
    });

    exports.enviar = async (opciones) => {

        const html = `  <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            </head>
                            <body>
                                <h2>Reestablecer password</h2>
                                <p>Hola, has solicitado reestablecer tu password, haz click en el
                                    siguiente enlace para reestablecerlo, este enlace es temporal, si
                                    vence vuelve a solicitarlo</p>
                                <a href=${opciones.resetUrl}>Ir a resetear tu password</a>
                                <p>Si no puedes acceder a este enlace, visita ${opciones.resetUrl}</p>
                                <p>Si no solicitaste este email, puedes ignorarlo</p>
                            </body>
                        </html>`;
        const text = htmlToText.fromString(html);

        // send mail with defined transport object
        await transporter.sendMail({
            from: 'UpTask <no-reply@uptask.com>', // sender address
            to: opciones.usuario.email, // list of receivers
            subject: opciones.subject, // Subject line
            text, // plain text body
            html // html body
        });
    }

    // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: 'UpTask <no-reply@uptask.com>', // sender address
    //     to: "correo@correo.com", // list of receivers
    //     subject: "Password Reset", // Subject line
    //     text: "Hola", // plain text body
    //     html: `<!DOCTYPE html>
    //     <html lang="en">
    //         <head>
    //             <meta charset="UTF-8">
    //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         </head>
    //         <body>
    //             <h2>Reestablecer password</h2>
    //             <p>Hola, has solicitado reestablecer tu password, haz click en el
    //                 siguiente enlace para reestablecerlo, este enlace es temporal, si
    //                 vence vuelve a solicitarlo</p>
    //             <a href=${resetUrl}>Ir a resetear tu password</a>
    //             <p>Si no puedes acceder a este enlace, visita ${resetUrl}</p>
    //             <p>Si no solicitaste este email, puedes ignorarlo</p>
    //         </body>
    //     </html>`, // html body
    // });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
