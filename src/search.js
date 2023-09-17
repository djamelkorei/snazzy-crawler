require('dotenv').config()
const { OpenAI } = require('openai');

async function searchForEntries (searchQuery) {

    console.log(process.env.API_KEY);
    const openai = new OpenAI({
        apiKey: process.env.API_KEY,
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });

    return completion.choices;
}



module.exports = {
    searchForEntries
}