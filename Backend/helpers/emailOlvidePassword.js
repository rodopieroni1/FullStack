import nodemailer from "nodemailer"


const emailOlvidePassword  = async ( datos ) => {
    const  transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
    console.log(datos);
    const {email, nombre, token}= datos;
    //enviar Mail
    const info = await transporter.sendMail({
        from: "APV - Administrador de pacientes de Veterinaria",
        to: email,
        subject: "Reestablecer tu password",
        text: "Reestablecer tu password",
        html:  `<p> Hola: ${nombre}, ha solicitado reestablecer tu password. </p>
        <p> siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a></p>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `,
    });
    console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;