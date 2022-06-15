let MainProvider = require('../models/SendGrid');
let BackupProvider = require('../models/Mailgun');

/**
 * Send Email by giving API message
 * @param message
 * @returns {Promise<{message: string, status: string}|{success: string, message: string}|undefined|{message: string, status: string}>}
 */
async function sendEmail(message) {
    try {
        let mainProvider = new MainProvider();
        mainProvider.setPropertiesFromAPIMessage(message)
        await mainProvider.send();
        return { status : 'OK', message : `Email successfully sent via ${mainProvider.name} mail service` }
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
        let backupProvider = new BackupProvider();
        backupProvider.setPropertiesFromAPIMessage(message)
        await backupProvider.send();
        return { status : 'OK', message : `Email successfully sent via backup email provider ${backupProvider.name}` }
    } catch (err) {
        return { success : 'failed', message : 'Failed to send email to both mail service providers, please contact your system admin' }
    }
}

module.exports = {
    sendEmail: sendEmail
    // more email service can be added here
}
