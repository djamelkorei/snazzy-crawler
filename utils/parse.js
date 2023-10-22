const { JSDOM } = require('jsdom');
const {Readability} = require("@mozilla/readability");
const { convert } = require('html-to-text');

const getTextFromHtml = (htmlBody)  => {
    const dom = new JSDOM(htmlBody);
    const htmlArticle = new Readability(dom.window.document).parse();
    const options = {
        wordwrap: 130,
        formatters: {
            // Create a formatter.
            'fooBlockFormatter': function (elem, walk, builder, formatOptions) {
                builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 1 });
                walk(elem.children, builder);
                builder.addInline('!');
                builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 1 });
            }
        },
    };
    return  convert(htmlArticle.content, options);
}

module.exports = {
    getTextFromHtml
};