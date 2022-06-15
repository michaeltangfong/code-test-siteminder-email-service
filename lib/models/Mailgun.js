const FormData = require('form-data');
const MailBase = require('./MailBase');

module.exports = class Mailgun extends MailBase {
    constructor() {
        super('Mailgun', process.env.MAILGUN_URL, `Basic ${process.env.MAILGUN_API_KEY}`, process.env.MAILGUN_TIMEOUT);
    }

    #genRecipientStr(recipient) {
        return recipient.name ? recipient.name + ' <' + recipient.email + '>' : recipient.email
    }

    /**
     * generate configuration for sending email via Mailgun API
     */
    #config(){
        // TODO : 3. Logic to check properties before send
        let data = new FormData();
        data.append('from', this.#genRecipientStr(this._from));

        if(this._recipients.to && Array.isArray(this._recipients.to)) {
            data.append('to', this.#genRecipientStr(this._recipients.to[0]));
            // TODO : 5. enable multiple recipient, cc or bcc in Gunmail production account, currently those features are not supported
            // for(let recipient of this._recipients.to) {
            //     data.append('to', this.#genRecipientStr(recipient));
            // }
        }
        // if(this._recipients.cc && Array.isArray(this._recipients.cc)) {
        //     for(let recipient of this._recipients.cc) {
        //         data.append('cc', this.#genRecipientStr(recipient));
        //     }
        // }
        // if(this._recipients.bcc && Array.isArray(this._recipients.bcc)) {
        //     for(let recipient of this._recipients.bcc) {
        //         data.append('bcc', this.#genRecipientStr(recipient));
        //     }
        // }
        data.append('subject', this._subject);
        data.append('text', this._content.value);

        return {
            method: 'post',
            url: this._url,
            headers: {
                'Authorization': this._authorization,
                ...data.getHeaders()
            },
            data : data,
            timeout : this._timeout
        };
    }

    async send() {
        let response = await super.send(this.#config());
        return new Promise((resolve, reject) => {
            if ( !response.data?.id ) // extra checking - missing id in Mailgun respond means error
                reject(response);
            else
                resolve(response);
        });
    }
}


