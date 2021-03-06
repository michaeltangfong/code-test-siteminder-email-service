# Technical Challenge for (Michael) Tang Tat Fong

## Project Explains
This project intends to build a node server which provide RESTful API for sending email and the main purpose for this challenge is to program a switchover mechanism that swap to secondary Email provider ([Mailgun](https://www.mailgun.com/)) if main service ([SendGrid](https://sendgrid.com/)) failed.

Project is created using [__Express framework__](https://expressjs.com/) and other libraries such as:

* [Express-validator](https://express-validator.github.io/docs/) - Validate input messages.
* [axios](https://www.npmjs.com/package/axios) - Make HTTP requests to Email Providers.
* [jest](https://jestjs.io/) - JavaScript Testing Framework.
* [form-data](https://www.npmjs.com/package/form-data) - make "multipart/form-data" streams for Mailgun request data. 

However challenge works are mainly written in three areas as explained below:
* /lib/models
* /lib/services
* /routes/email/send.js


```bash
.
├── lib                           
    ├── models                    
        ├── MailBase.js           # Mail base class
        ├── Nylas.js              # Nylas Class inherit MailBase
        ├── Mailgun.js            # Mailgun Class inherit MailBase
        ├── SendGrid.js           # SendGrid Class inherit MailBase
    ├── services                  
        ├── MailServices.js       # provides send email function and switchover feature
├── routes
    ├── email
        ├── send.js               # validate API message and handle request 
```

___
 
## Testing public server
URL: http://3.25.165.67:3000/email/send

**Make API request using curl:**

(please replace to, cc, bcc to your email addresses)
```shell
curl --location --request POST 'http://3.25.165.67:3000/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
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
}'
```
Response:
```shell
{
    "status": "OK",
    "message": "Email sent via SendGrid mail service"
}
```

Email Provider Sandbox Environment constrains:
> * When email is sent via __SendGrid__, sender's email address needed to be a verified domain, which is __alpacanets.com__ in my trial account.
> * You may not be able to send cc or bcc if using __Mailgun__ service, they are not allowed in sandbox environment.
> * When email is sent via __Nylas__, you may receive email from michaeltangfong@gamil even the "from" parameter were provided, this is because __Nylas__ replace it with the (only allowed) registered email address in sandbox environment.



**Triggering failover case**

(please replace to, cc, bcc to your email addresses and keep from address as it is)

Simply replace sender's email address domain other than alpacanets.com, this will fail the primary email service (SendGrid) and backup service (Mailgun) will be used instead, as below:

```shell
curl --location --request POST 'http://3.25.165.67:3000/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
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
        "email": "jack.sparrow@faildomain.com",
        "name": "Jack Sparrow"
    }
}'

```
Response:
```shell
{
    "status": "OK",
    "message": "Email successfully sent via backup email provider Mailgun"
}
```

**Alternatively, you can use [postman](https://www.postman.com/) to make API request:**

![alt text](./public/images/sendgrid_postman_sample.png)
___




## Development

**Project Requirements**
* Node.js (v18)
* NVM
* Yarn (optional)

**Initial checkout:**

```shell
git clone git@github.com:michaeltangfong/siteminder-node-mail-api.git
cd siteminder-node-mail-api

npm install
# or 
yarn install
```


**Configuration**

Create `.env` file and update configuration value respectively
```shell
# copy from configuration template file
cp .env.template .env
```


**Initial project and start application:**
```shell
# make nvm to use preferred node version 
nvm use
```
```shell
# start project
npm start 
# or 
yarn start
```

**making request using curl**
```shell
curl --location --request POST '127.0.0.1:3000/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "version": "1.0.0",
    "request_uuid": "8050a83d-0536-4136-a945-771e75e295d8",
    "request_utc": "2022-06-14T05:04:40.000Z",
    "recipients": [
        {
            "to": [
                {
                    "email": "youremail@mail.com",
                    "name": "You Name"
                }
            ],
            "cc": [
                {
                    "email": "ccemail@mail.com"
                }
            ],
            "bcc": [
                {
                    "email": "bccemail@mail.com"
                }
            ]
        }
    ],
    "subject": "A message form captain Jack Sparrow",
    "content": {
        "type": "text/plain",
        "value": "Why fight when you can negotiate?"
    },
    "from": {
        "email": "jack.sparrow@alpacanets.com",
        "name": "Jack Sparrow"
    }
}'
```

### Message properties summary ###

| Property              | Datatype | Optional |                                            Sample Data |                                                   Remark |
|-----------------------|:--------:|---------:|-------------------------------------------------------:|---------------------------------------------------------:|
| version               |  String  |        N |                                                "1.0.0" |                                          service version |
| request_uuid          |  String  |        N |                 "8050a83d-0536-4136-a945-771e75e295d8" |                                        unique request id |
| request_utc           |  String  |        N |                             "2022-06-14T05:04:40.000Z" |                                         request time utc |
| recipients            |  Array   |        N |                                                        |                    envelope of message, array of  object |
| recipients &#124; to  |  Array   |        N | [{"email":"youremail@email.com"},{"name":"Your Name"}] |                                      array of recipients |
| recipients &#124; cc  |  Array   |        Y | [{"email":"youremail@email.com"},{"name":"Your Name"}] |                     array of carbon copy (cc) recipients |
| recipients &#124; bcc |  Array   |        Y | [{"email":"youremail@email.com"},{"name":"Your Name"}] |              array of blind carbon copy (bcc) recipients |
| subject               |  String  |        N |                  "A message form captain Jack Sparrow" |                                            email subject |
| content               |  Object  |        N |          {"type":"text/plain","value":"email content"} | email type and content, currently support plaintext only |
| from                  |  Object  |        N |   {"email":"youremail@email.com"},{"name":"Your Name"} |                                           sender address |

*alternatively you are free use any API client (e.g. Postman ) to send request.*

## Todo & enhancements list
1. Complete Mail class property validation.
2. Complete test case scenarios.
3. Check email class properties before send.
4. Customise validation error message to be more generic (e.g. error code) , so feedback can be done both backend and frontend. 
5. Refine validation cases (check for json, subject and body length)
6. enable multiple recipient, cc or bcc in Gunmail production account, currently those features are not supported.


## Enhancements
1. Implement authentication.
2. Message encryption.
3. Implement graphQL instead.
4. Keep API Request record in Database.
5. Implement an email enquiry API.
6. Deploy script to generate pre-launch / production `.env` configuration.
