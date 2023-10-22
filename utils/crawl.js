const { JSDOM } = require('jsdom');
const {getTextFromHtml} = require("./parse");

async function crawlPage(baseURL , currentURL, pages) {

    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);
    if(baseURLObject.hostname !== currentURLObject.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL]) {
        return pages
    }

    console.log(`actively crawling: ${currentURL}`)

    try {

        const response = await fetch(currentURL);
        if(response.status > 399 ) {
            console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`)
            return pages
        }

        const contentTye =  response.headers.get("content-type");
        if(!contentTye.toLowerCase().includes('text/html')) {
            console.log(`none html response, content type: ${contentTye}, on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await response.text();

        pages[normalizedCurrentURL] = getTextFromHtml(htmlBody);
        const nextURLs= getURLsFromHTML(htmlBody, baseURL);

        for (const nextUrl of nextURLs) {
            if(Object.keys(pages).length > 10) {
                break;
            }
            if(filterUrl(nextUrl)) {
                continue;
            }
            pages = await crawlPage(baseURL, nextUrl, pages);
        }

    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    return pages;
}

function filterUrl(url) {
    return ['.png', '.jpg', '.jfif', '.jpeg', '.svg', '.doc', '.docx', '.pdf', '.csv']
        .some(fruit => url.includes(fruit))
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    console.log(linkElements);
    for(const linkElement of linkElements) {
        if(linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolute
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath
}

module.exports = {
    crawlPage
}; 