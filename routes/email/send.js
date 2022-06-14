const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const MailServices = require('../../lib/services/MailServices');

// validate incoming message
let validations = [
    body('version','missing API version').exists(),
    body('request_uuid','missing request id').exists(),
    body('request_utc','missing request time').exists(),
    body('recipients.to', 'missing recipient email address').exists(),
    body('recipients.to.*.email', 'missing recipient email address').exists(),
    body('recipients.to.*.email', 'invalid recipient email address').isEmail(),
    body('from.email','missing sender email address').exists(),
    body('from.email','invalid sender email address').isEmail(),
    body('subject', 'missing subject').exists(),
    body('content.type', 'accept text/plain email content only').equals('text/plain'),
    body('content.value', 'missing email content value').exists(),
    //
]

// TODO : 1. Implement authentication
// TODO : 2. Message encryption
/* POST email api. */
router.post('/', validations, async (req, res, next) => {
    const errors = validationResult(req);
    // TODO : 10. Customise validation error message to be more generic
    // reply error if validation fail
    if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    // TODO : 3. Keep API Request record in Database

    // send email and reply result
    let result = await MailServices.sendEmail(req.body);
    console.log('respond: ', result);
    res.json(result);
});

module.exports = router;
