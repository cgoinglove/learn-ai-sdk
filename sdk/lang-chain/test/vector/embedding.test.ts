import { describe, test } from 'vitest'
// import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { Document } from 'langchain/document'
import { OllamaEmbeddings } from '@langchain/ollama'

describe.skip('embedding', () => {
  test('ollama: memoryVector', async () => {
    const embeddings = new OllamaEmbeddings({
      model: 'nomic-embed-text',
    })

    const vectorStore = new MemoryVectorStore(embeddings)
    const generateDocument = (pageContent: string, id: number) =>
      new Document({
        id: String(id),
        pageContent,
      })
    const documents = [
      'Adidas Soccer Cleats',
      'Nike Sports Jacket',
      'Adidas Training Shorts',
      'Nike Basketball Sneakers',
      'Adidas Running Shoes',
      'Nike Casual T-Shirt',
      'Adidas Casual Hoodie',
      'Nike Sports Bag',
      'Adidas Leggings',
    ].map(generateDocument)

    await vectorStore.addDocuments(documents)

    const searchResults = await vectorStore.similaritySearch('foot', 2)

    console.log(searchResults)
  })
})
