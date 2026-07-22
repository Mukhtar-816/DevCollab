const { createTransport } = require("nodemailer");
require("dotenv").config();

const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function checkTransport (){
    try {
        await transport.verify();
        console.log("Transport Ready for mails");
    } catch (error) {
        console.log(error);
    }
};

checkTransport();

module.exports = transport;