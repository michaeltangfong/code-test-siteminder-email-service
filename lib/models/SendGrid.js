const MailBase = require('./MailBase');

module.exports = class SendGrid extends MailBase {
    constructor(options) {
        super(process.env.SENDGRID_URL, `Bearer ${process.env.SENDGRID_API_KEY}`, process.env.SENDGRID_TIMEOUT);
    }

    /**
     * generate configuration for sending email via SendGrid API
     */
    #config(){
        let personalization = this._recipients;
        personalization['subject'] = this._subject;
        return {
            method: 'post',
            url: this._url,
            headers: {
                'Authorization': this._authorization,
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "personalizations": [personalization],
                "content": [this._content],
                "from": this._from,
                "reply_to": this._from
            }),
            timeout: this._timeout
        }
    }

    async send() {
        // TODO : Logic to check properties before send
        return await super.send(this.#config())
    }
}


