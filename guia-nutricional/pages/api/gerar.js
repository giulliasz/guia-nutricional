export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, nome } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key não configurada', content: null });
    }

    const sistemaPrompt = `Você é um nutricionista experiente e humanizado.

REGRAS OBRIGATÓRIAS SOBRE ORÇAMENTO:
- Se orçamento for "até R$50/semana": use APENAS ovos, arroz, feijão, macarrão, frango coxa/sobrecoxa (mais barato), banana, batata, cenoura, repolho, sardinha em lata. Sem suplementos.
- Se orçamento for "R$50 a R$100/semana": ovos, frango, arroz, feijão, aveia, banana, batata-doce, atum em lata, legumes básicos, iogurte natural simples.
- Se orçamento for "R$100 a R$200/semana": variedade razoável, pode incluir whey concentrado básico se necessário.
- Se orçamento for "acima de R$200/semana": mais liberdade, mas sempre priorize alimentação real em vez de suplementos.
- NUNCA sugira alimentos caros como salmão, quinoa, mix de castanhas premium, suplementos caros independente do orçamento.
- Sempre calcule e informe o custo aproximado semanal do cardápio sugerido.
- Linguagem simples, humana, sem termos técnicos.
- Personalizar 100% com base nos dados fornecidos.`;

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
        system: sistemaPrompt,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message, content: null });
    }

    const content = data.content && data.content[0] ? data.content[0].text : null;

    if (!content) {
      return res.status(500).json({ error: 'Sem conteúdo gerado', content: null });
    }

    res.status(200).json({ content, nome });

  } catch (error) {
    res.status(500).json({ error: error.message, content: null });
  }
}
