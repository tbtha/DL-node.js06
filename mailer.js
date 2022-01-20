const nodemailer = require ("nodemailer");

const enviar = async (to,subject,html) =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "da888e997ad0ce",
          pass: "d50e75f02e1351",
        }
    })

    const mailOptions ={
        from:'da888e997ad0ce',
        to,
        subject,
        html,
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info)
        return {ok:true, msg: "enviado con exito"}
    } catch (error) {
        return {ok:false, msg:"fallo" }
    }

}
module.exports = enviar