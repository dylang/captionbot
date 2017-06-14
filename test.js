import test from 'ava';
import captionbot from './';

test('image', async t => {
    const result = await captionbot('http://imgur.com/B7a15F5.jpg');
    t.is(result, `I think it's a dog that is covered in snow.`);
});

test.cb('image using caption', t => {
    t.plan(2);
    captionbot('http://imgur.com/B7a15F5.jpg', (err, result) => {
        t.falsy(err);
        t.is(result, `I think it's a dog that is covered in snow.`);
        t.end();
    });
});

test('non-image url', async t => {
    const result = await captionbot('http://microsoft.com/');
    t.is(result, `I really can't describe the picture 😳`);
});

test('no url', async t => {
    const result1 = await t.throws(captionbot());
    t.is(result1.message, 'A valid url is required.');

    const result2 = await t.throws(captionbot(''));
    t.is(result2.message, 'A valid url is required.');

    const result3 = await t.throws(captionbot({}));
    t.is(result3.message, 'A valid url is required.');
});
