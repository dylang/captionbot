# captionbot [![Build Status](https://travis-ci.org/dylang/captionbot.svg?branch=master)](https://travis-ci.org/dylang/captionbot)

> Get captions for image using Microsoft's CaptionBot 🤖

| <img src="http://imgur.com/B7a15F5.jpg" width="300px"> |
|--------------------------------------|
| `🤖 I think it's a dog in the snow.` |

## Install

```
$ npm install --save captionbot
```


## Usage

```js
const captionbot = require('captionbot');

captionbot('http://imgur.com/B7a15F5.jpg');
    .then(caption => {
        console.log(caption);
    })

//=> 'I think it's a dog in the snow.'
```


## API

### captionbot(imageUrl)

#### imageUrl

Type: `string`

Url to the image. Must be on a public server that Microsoft's servers can download to determine the caption.

Returns a promise for the caption.


## Notes

* Requires Node 4 or newer.
* Powered by [CaptionBot](https://www.captionbot.ai/), a free service provided by Microsoft.
* If you like this, you can read more at https://www.microsoft.com/cognitive-services.
* This node module was not created by Microsoft.
* I would consider this module "for testing only" - I do not recommend using in a production system.
* Microsoft: I made this because I am a fan of the technology. If there are any problems, or you want to use this package name, I'm happy to discuss.

## License

MIT © [Dylan Greene](https://github.com/dylang)
