let Nylas = require('../models/Nylas');
let Mailgun = require('../models/Mailgun');

/**
 * Send Email by giving API message
 * @param message
 * @returns {Promise<{message: string, status: string}|{success: string, message: string}|undefined|{message: string, status: string}>}
 */
async function sendEmail(message) {
    try {
        let nylas = new Nylas();
        nylas.setPropertiesFromAPIMessage(message)
        await nylas.send();
        return { status : 'OK', message : 'Email sent via Nylas mail service' }
    } catch (err) {
        // catch error and send email using secondary email provider
        return failoverSendEmail(message);
    }
}

/**
 * failover send email function
 * @param message
 * @returns {Promise<{success: string, message: string}|{message: string, status: string}>}
 */
async function failoverSendEmail(message) {
    try {
        let mailgun = new Mailgun();
        mailgun.setPropertiesFromAPIMessage(message)
        await mailgun.send();
        return { status : 'OK', message : 'Sent via fail over Mailgun mail service ' }
    } catch (err) {
        return { success : 'failed', message : 'Failed to send email to both mail service providers, please contact your system admin' }
    }
}

module.exports = {
    sendEmail: sendEmail
    // more email service can be added here
}
