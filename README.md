# siteminder-node-mail-api



DEBUG=siteminder-node-mail-api:* npm start
## Project Requirements
* Node.js (v18)
* NVM
* Yarn (optional)


## Development
Initial checkout:
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

## Further todo & enhancements list
1. Implement authentication
2. Message encryption
3. Keep API Request record in Database
4. Implement an email enquiry API
5. Implement graphQL instead
6. Customise error message
7. Complete API Message Validation
8. Complete test case scenarios (include idempotent)
9. Deploy script to generate pre-launch / production `.env` configuration
10. Customise validation error message to be more generic
