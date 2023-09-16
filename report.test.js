const {sortPages} = require('./report');
const {test, expect} = require('@jest/globals');

test('sortPages', () => {
    const input = {
        'https://www.djamelkorei.com/path': 2,
        'https://www.djamelkorei.com': 3,
        'https://www.djamelkorei.com/path3': 8,
        'https://www.djamelkorei.com/path2': 3,
        'https://www.djamelkorei.com/path4': 6,
    };
    const actual = sortPages(input);
    const expected = [
        ['https://www.djamelkorei.com/path3', 8],
        ['https://www.djamelkorei.com/path4', 6],
        ['https://www.djamelkorei.com', 3],
        ['https://www.djamelkorei.com/path2', 3],
        ['https://www.djamelkorei.com/path', 2]
    ];
    expect(actual).toEqual(expected);
});