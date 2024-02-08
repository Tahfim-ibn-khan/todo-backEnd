const nodeMailer = require('nodemailer');

const sendEmailUtility = async (emailTo, emailText, emailSubject) => {
    let transporter = nodeMailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: 'info@teamrabbil.com',
            pass: '~sR4[bhaC[Qs'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'Task manager app <info@teamrabbil.com>',
        to: emailTo, // Corrected 'emailTo' to 'to'
        subject: emailSubject, // Added subject field
        text: emailText // Changed 'emailText' to 'text'
    };

    try {
        let result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
module.exports=sendEmailUtility;
