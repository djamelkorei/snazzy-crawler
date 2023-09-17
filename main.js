const {printReport} = require("./src/report");
const {crawlPage} = require('./src/crawl');
const {parsePage} = require("./src/parse");

async function main() {
    if(process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1);
    }

    if(process.argv.length < 4) {
        console.log("no starter provided")
        process.exit(1);
    }

    if(process.argv.length > 4) {
        console.log("to many command line args")
        process.exit(1);
    }


    const type = process.argv[3];

    if(!['crawl', 'parse'].includes(type)) {
        console.log("Unknown args type choose: ['crawl', 'parse']")
        process.exit(1);
    }

    const baseURL = process.argv[2];

    if(type === 'crawl') {
        console.log(`starting crawl of ${baseURL}`);
        const pages = await crawlPage(baseURL, baseURL, {});
        printReport(pages);
    } else {
        console.log(`starting parse of ${baseURL}`);
        const text = await parsePage(baseURL);
        console.log(text)
    }
}

main();