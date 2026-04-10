export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: 'Você é o assistente de suporte do Guia Nutricional Personalizado. Responda em português brasileiro, de forma simples, humana e acolhedora. Seja direto e objetivo — respostas curtas de 2 a 4 linhas. O produto é um guia nutricional + treino em PDF por R$20, personalizado com base num questionário. A pessoa paga, responde o questionário e baixa o PDF na hora. Tem 7 dias de garantia. Nunca prometa resultados específicos. Se a pergunta for muito clínica, oriente a buscar um profissional.',
        messages: messages
      })
    });

    const data = await response.json();
    const text = data.content && data.content[0] ? data.content[0].text : 'Desculpe, tive um problema. Tente novamente!';
    res.status(200).json({ response: text });

  } catch (error) {
    res.status(500).json({ error: 'Erro interno', response: 'Ops, problema de conexão. Tente novamente!' });
  }
}
