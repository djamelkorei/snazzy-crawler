const express = require('express');
const cron = require("node-cron");
const {crawlPage} = require("./utils/crawl");
const {processText} = require("./utils/embedding");
const {getAllOffices } = require("./utils/service");
const app = express();
const port = 3000;

cron.schedule("*/15 * * * * *", async function () {
    console.log("start processing ...");
    const offices = await getAllOffices();
    for (const office of offices ) {
        const url = office.url;
        const pages = await crawlPage(url, url, {});
        const text =  Object.keys(pages).map(key => pages.key).join(" ");
        await processText(office.id, text)
    }
});

// testing
app.get('/', async (req, res) => {
    if(req.query.url) {
       const pages = await crawlPage(req.query.url, req.query.url, {});
       const text =  Object.keys(pages).map(key => pages.key).join(" ");
       await processText(text)
    }
    res.json({ "process" : "finish"});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});