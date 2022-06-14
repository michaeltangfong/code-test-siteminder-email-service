const MailServices = require('./MailServices');
let Nylas = require('../models/Nylas');
let Mailgun = require('../models/Mailgun');

jest.mock('../models/Nylas');

let message = {
    "version": "1.0.0",
    "request_uuid": "8050a83d-0536-4136-a945-771e75e295d8",
    "request_utc": "2022-06-14T05:04:40.000Z",
    "recipients": {
        "to": [
            {
                "email": "michaeltangfong@gmail.com",
                "name": "Michael Fong"
            },
            {
                "name": "Michael Fong",
                "email": "michaeltangfong@outlook.com"
            }
        ],
        "bcc": [
            {
                "email": "michaeltangfong@icloud.com"
            }
        ]
    },
    "subject": "A message form captain Jack Sparrow",
    "content": {
        "type": "text/plain",
        "value": "Why fight when you can negotiate?"
    },
    "from": {
        "email": "jack.sparrow@alpacanets.com",
        "name": "Jack Sparrow"
    }
}


describe(`Test success case`,  () => {
    test('send Nylas service success', async () => {
        let nylas = new Nylas();
        nylas.send.mockResolvedValue()
        expect(await MailServices.sendEmail(message)).toStrictEqual({"message": "Email sent via Nylas mail service", "status": "OK"});
    })

    // TODO : 2. Complete test case scenarios
});

