const { JSDOM } = require('jsdom');

async function parsePage(currentURL) {
    const response = await fetch(currentURL);
    const htmlBody = await response.text();
    return getTextFromHtml(htmlBody);
}

function getTextFromHtml(htmlBody) {
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
    parsePage
}