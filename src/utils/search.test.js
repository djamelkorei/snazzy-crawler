const {searchForEntries} = require('./search');
const {test, expect} = require("@jest/globals");


test("searchForEntries", async () => {
    const input = "best firm for divorce cases";
    const actual = await searchForEntries(input);
    const expected = [];
    expect(actual).toEqual(expected);
});