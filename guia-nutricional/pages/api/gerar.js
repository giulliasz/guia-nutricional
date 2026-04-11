export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, nome } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key não configurada', content: null });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: data.error.message, content: null });
    }

    const content = data.content && data.content[0] ? data.content[0].text : null;

    if (!content) {
      return res.status(500).json({ error: 'Sem conteúdo gerado', data: data, content: null });
    }

    res.status(200).json({ content, nome });

  } catch (error) {
    res.status(500).json({ error: error.message, content: null });
  }
}
