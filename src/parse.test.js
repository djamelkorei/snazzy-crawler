const {getTextFromHtml} = require("./parse");
const {test, expect} = require('@jest/globals');

test('getTextFromHtml', () => {
    const input = `
        <html lang="en">
        <body>
            <h1>Title</h1>
            <p>Hello World!</p>
        </body>
        </html> 
    `;
    const actual = getTextFromHtml(input);
    const expected = "Title Hello World!";
    expect(actual).toEqual(expected);
});


