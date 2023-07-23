import nodemailer from 'nodemailer'
import { getFromEnv } from '../getFromEnv.js';
import { EmailData } from '../types.js';
import { emailHtml } from './emailHtml.js';
import { logErrInfoMsg, logSuccessMsg } from '../console/log.js';

export const sendEmail = ({ userEmail, token, subject }: EmailData) => {
    const { user, email, pass, emailService } = getFromEnv()

    const transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
            user: email,
            pass
        }
    });

    transporter.sendMail({
        from: `"${user}" <${email}>`,
        to: userEmail,
        subject,
        html: emailHtml({ token }),
    }, (err, info) => {

        if (err) {
            logErrInfoMsg(err);
        } else {
            logSuccessMsg('Message Sended Successfully ' + info.accepted);
        }
    });
}

