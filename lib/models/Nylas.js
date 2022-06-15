const MailBase = require('./MailBase');

/**
 * Nylas
 * @type {Nylas}
 */
module.exports = class Nylas extends MailBase {
    constructor() {
        super('Nylas', process.env.NYLAS_URL, `Bearer ${process.env.NYLAS_API_KEY}`, process.env.NYLAS_TIMEOUT);
    }

    /**
     * generate configuration for sending email via Nylas API
     */
    #config(){
        // TODO : 3. Logic to check properties before send
        let data = {
            "subject": this._subject,
            "to": this._recipients.to,
            "body": this._content.value,
            "from": [this._from]
        }
        if (this._recipients.cc) data["cc"] = this._recipients.cc;
        if (this._recipients.bcc) data["bcc"] = this._recipients.bcc;

        return {
            method: 'post',
            url: this._url,
            headers: {
                'Authorization': this._authorization,
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data),
            timeout: this._timeout
        }
    }

    async send() {
        // TODO : Logic to check properties before send
        return await super.send(this.#config())
    }
}


