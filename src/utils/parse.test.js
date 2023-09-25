const {getTextFromHtmlOld} = require("./parse");
const {test, expect} = require('@jest/globals');

test('getTextFromHtmlOld', () => {
    const input = `
        <html lang="en">
        <body>
            <h1>Title</h1>
            <p>Hello World!</p>
        </body>
        </html> 
    `;
    const actual = getTextFromHtmlOld(input);
    const expected = "Title Hello World!";
    expect(actual).toEqual(expected);
});


