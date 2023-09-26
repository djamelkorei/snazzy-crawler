require('dotenv').config()
import OpenAI from 'openai'

export async function embeddingText (text: string) {
    const openAI = new OpenAI({ apiKey: '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' })
    const embeddingResponse = await openAI.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
    })
    const [{ embedding }] = embeddingResponse.data
    return embedding;
}

