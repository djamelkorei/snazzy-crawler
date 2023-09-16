const {normalizeURL, getURLsFromHTML} = require('./crawl');
const {test, expect} = require('@jest/globals'); 

test('normalizeURL strip protocol', () => {
    const input = 'https://dev.djamelkorei.com/series/spring-boot';
    const actual = normalizeURL(input);
    const expected = 'dev.djamelkorei.com/series/spring-boot';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
    const input = 'https://dev.djamelkorei.com/series/spring-boot/';
    const actual = normalizeURL(input);
    const expected = 'dev.djamelkorei.com/series/spring-boot';
    expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
    const input = 'https://DEV.djamelkorei.com/series/spring-boot';
    const actual = normalizeURL(input);
    const expected = 'dev.djamelkorei.com/series/spring-boot';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
    const input = 'http://dev.djamelkorei.com/series/spring-boot';
    const actual = normalizeURL(input);
    const expected = 'dev.djamelkorei.com/series/spring-boot';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html lang="en">
        <body>
            <a href="https://dev.djamelkorei.com/">Djamel Korei Blog</a>
        </body>
        </html> 
    `;
    const inputBaseURL = "https://dev.djamelkorei.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://dev.djamelkorei.com/"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML multiple', () => {
    const inputHTMLBody = `
        <html lang="en">
        <body>
            <a href="https://dev.djamelkorei.com/">Djamel Korei Blog</a>
            <a href="/series/spring-boot/">Djamel Korei Blog Spring Boot Series</a>
        </body>
        </html> 
    `;
    const inputBaseURL = "https://dev.djamelkorei.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://dev.djamelkorei.com/", "https://dev.djamelkorei.com/series/spring-boot/"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html lang="en">
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
        </html> 
    `;
    const inputBaseURL = "https://dev.djamelkorei.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});