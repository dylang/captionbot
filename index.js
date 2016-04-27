'use strict';

const got = require('got');
const validUrl = require('valid-url').isUri;

module.exports = function (imageUrl) {
    if (!validUrl(imageUrl)) {
        return Promise.reject(new Error('A valid url is required.'));
    }

    return got('https://www.captionbot.ai/api/init', {json: true})
        .then(response => {
            const conversationId = response.body;
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
        .then(response => {
            return (JSON.parse(response.body).UserMessage || '').trim();
        });
};
