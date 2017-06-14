'use strict';

const got = require('got');
const validUrl = require('valid-url').isUri;

function captionbot(imageUrl) {
    var conversationId;

    if (!validUrl(imageUrl)) {
        return Promise.reject(new Error('A valid url is required.'));
    }

    return got('https://www.captionbot.ai/api/init', {json: true})
        .then(response => {
            conversationId = response.body;
            const cookie = response.headers['set-cookie'][0].split(';')[0];

            const options = {
                body: {
                    conversationId: conversationId,
                    waterMark: '',
                    userMessage: imageUrl
                },
                headers: {
                    cookie: cookie
                },
                json: true
            };

            return got('https://www.captionbot.ai/api/message', options);
        })
        .then(function () {
            const options = {
                query: {
                    conversationId: conversationId,
                    waterMark: ''
                }
            };

            return got('https://www.captionbot.ai/api/message', options)
                .then(response => {
                    return JSON.parse(JSON.parse(response.body)).BotMessages[1].trim();
                });
        });
}

function callback(imageUrl, cb) {
    captionbot(imageUrl)
        .then(caption => cb(null, caption))
        .catch(err => cb(err));
}

// callback support is provided for a training exercise
module.exports = (imageUrl, cb) => {
    if (typeof cb === 'function') {
        callback(imageUrl, cb);
    } else {
        return captionbot(imageUrl);
    }
};
