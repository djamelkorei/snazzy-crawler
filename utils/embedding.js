const OpenAI = require('openai');
const {createDocument, updateOfficeToProcessed} = require("./service");

async function processText (officeId, text) {
    const chunks = splitTextIntoChunks(text);
    for (const chunk of chunks) {
        const embedding = await embeddingText(chunk);
        await createDocument(officeId, '', embedding);
    }
    await updateOfficeToProcessed(officeId);
    return true;
}

async function embeddingText (text) {
    const openAI = new OpenAI({ apiKey: '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' })
    const embeddingResponse = await openAI.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
    })
    const [{ embedding }] = embeddingResponse.data
    return embedding;
}

function splitTextIntoChunks(text) {
    const tokensPerChunk = 8191;

    const words = text.split(" ");
    const chunks = [];
    let currentChunk = [];
    let currentTokenCount = 0;

    for (const word of words) {
        currentChunk.push(word);
        currentTokenCount += 1;

        if (currentTokenCount >= tokensPerChunk) {
            chunks.push(currentChunk.join(" "));
            currentChunk = [];
            currentTokenCount = 0;
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(" "));
    }

    return chunks;
}


module.exports = {
    processText
};