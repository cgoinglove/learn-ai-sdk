import { describe, test } from 'vitest'
import { ChatOpenAI } from '@langchain/openai'
import { ChatOllama } from '@langchain/ollama'

describe('model test', () => {
  test.skip('open-ai', async () => {
    // check .env OPEN_API_KEY
    const model = new ChatOpenAI({ model: 'gpt-4o-mini' })
    const answer = await model.invoke('ping')
    console.log(answer)
  })
  test.skip('ollama', async () => {
    // check ollama model
    const model = new ChatOllama({ model: 'qwen2.5-coder:1.5b' })
    const answer = await model.invoke('ping')
    console.log(answer)
  })
})
