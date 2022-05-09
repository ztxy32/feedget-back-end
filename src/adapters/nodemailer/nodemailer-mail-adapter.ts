import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4a26a94a431c8c",
      pass: "6bd6c13c8ddd5b"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: "equipe feedget <oi@feedget.com.br>",
            to: "Eris Stark <meuEmail@mail.com>",
            subject,
            html: body
        })
    }

}