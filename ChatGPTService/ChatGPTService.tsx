import { OPENAI_KEY } from '@env';

export const generateResponse = async (message: string) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
        max_tokens: 60
      })
    });

    const data = await response.json();
    console.log('string reponse: ', JSON.stringify(data))
    console.log('json reponse: ', data)

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Error generating AI response';
  }
};