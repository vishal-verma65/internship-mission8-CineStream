import { useState } from 'react'
import { Mistral } from '@mistralai/mistralai'

const client = new Mistral({
  apiKey: import.meta.env.VITE_MISTRAL_API_KEY || '',
})

const useMoodMatcher = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getMovieFromMood = async (moodPrompt) => {
    if (!moodPrompt?.trim()) return null
    setLoading(true)
    setError(null)

    try {
      const response = await client.chat.complete({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'system',
            content:
              'You are a movie recommendation assistant. ' +
              'When given a mood or feeling, respond with ONLY a single well-known movie title — ' +
              'no explanation, no punctuation, no extra words. Just the title.',
          },
          {
            role: 'user',
            content: moodPrompt,
          },
        ],
        maxTokens: 20,
        temperature: 0.7,
      })

      const title = response.choices?.[0]?.message?.content?.trim()
      return title || null
    } catch (err) {
      setError('Could not reach Mistral. Check your API key.')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { getMovieFromMood, loading, error }
}

export default useMoodMatcher