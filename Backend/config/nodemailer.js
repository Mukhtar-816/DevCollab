const { createTransport } = require("nodemailer");
require("dotenv").config();

const transport = createTransport({
    host: process.env.HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.SECURE === "true",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASS
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