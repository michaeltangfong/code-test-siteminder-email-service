const axios = require('axios');

/**
 * Mail base class
 * @type {Mail}
 */
module.exports = class Mail {
    /**
     * Mail class constructor
     * @param url - string
     * @param authorization - string
     * @param timeout - integer
     */
    constructor(name, url, authorization, timeout) {
        this._name = name;
        this._url = url;
        this._authorization = authorization;
        this._timeout = timeout;
    }

    get name() { return this._name; }
    get url() { return this._url; }
    get timeout() { return this._timeout; }

    get personalizations() { return this._recipients; }
    set personalizations(value) { this._recipients = value; }

    get from() { return this._from; }
    set from(value) { this._from = value; }

    get reply() { return this._reply; }
    set reply(value) { this._reply = value; }

    get subject() { return this._subject; }
    set subject(value) { this._subject = value; }

    get content() { return this._content; }
    set content(value) { this._content = value; }

    setPropertiesFromAPIMessage(message){
        // TODO : 1. Complete Mail class property validation
        this._from = message?.from;
        this._recipients = message?.recipients;
        this._subject = message?.subject;
        this._content = message?.content;
    }

    async send(config) {
        return new Promise((resolve, reject) => {
            axios(config)
                .then(function (response) {
                    console.log('axios success ', JSON.stringify(response.data));
                    resolve(response);
                })
                .catch(function (error) {
                    console.log('axios error ', JSON.stringify(error));
                    reject(error);
                });
        })
    }

}



