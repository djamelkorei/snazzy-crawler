const { JSDOM } = require('jsdom');
const {Readability} = require("@mozilla/readability");
const { convert } = require('html-to-text');

async function parsePage(currentURL) {
    const response = await fetch(currentURL);
    const htmlBody = await response.text();
    return getTextFromHtml(htmlBody);
}

function getTextFromHtml(htmlBody) {
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

// deprecated
function getTextFromHtmlOld(htmlBody) {
    const dom = new JSDOM(htmlBody);
    const body = dom.window.document.querySelector('body').innerHTML;
    return body
        .replace(/\n/ig, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/ig, '')
        .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/ig, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/ig, '')
        .replace(/<\/\s*(?:p|div)>/ig, '\n')
        .replace(/<br[^>]*\/?>/ig, '\n')
        .replace(/<[^>]*>/ig, '')
        .replace('&nbsp;', ' ')
        .replace(/[^\S\r\n][^\S\r\n]+/ig, ' ').trim()
}

module.exports = {
    getTextFromHtml,
    getTextFromHtmlOld,
    parsePage
}