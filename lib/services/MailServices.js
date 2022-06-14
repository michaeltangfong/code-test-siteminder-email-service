let SendGrid = require('../models/SendGrid');
let Mailgun = require('../models/Mailgun');

async function sendEmail(message) {
    console.log('MailServices sending mail');
    try {
        let sendGrid = new SendGrid();
        sendGrid.setPropertiesFromAPIMessage(message)
        await sendGrid.send()
        console.log('Mail Service OK')
        return { status : 'OK', message : 'Email sent via SendGrid mail service' }
    } catch (err) {
        console.log('caught error from Mail Service')
        return failoverSendEmail(message);
    }
}

async function failoverSendEmail(message) {
    try {
        console.log('MailServices failover sending mail');
        let mailgun = new Mailgun();
        mailgun.setPropertiesFromAPIMessage(message)
        await mailgun.send();
        return { status : 'OK', message : 'Sent via fail over Mailgun mail service ' }
    } catch (err) {
        console.log('caught error from Mail Service')
        return { success : 'failed', message : 'Failed to send email to both mail service providers, please contact your system admin' }
    }
}

module.exports = {
    sendEmail: sendEmail
    // more email service can be added here
}
