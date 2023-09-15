const {normalizeURL} = require('./crawl');
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