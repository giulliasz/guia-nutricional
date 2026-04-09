export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const d = req.body;

  const prompt = `Você é um nutricionista com mais de 15 anos de experiência clínica, com pós-graduação em nutrição clínica, esportiva e comportamento alimentar. Você atendeu milhares de pacientes e escreve de forma humana, acolhedora, profissional e motivadora.

DADOS DO PACIENTE:
- Nome: ${d.nome}
- Sexo: ${d.sexo}
- Idade: ${d.idade} anos
- Peso: ${d.peso} kg
- Altura: ${d.altura} cm
- Objetivo: ${d.objetivo}
- Nível de atividade física: ${d.nivel_atividade}
- Rotina diária: ${d.rotina}
- Hábitos alimentares atuais: ${d.habitos}
- Restrições/alergias: ${d.restricoes || "Nenhuma"}
- Preferências alimentares: ${d.preferencias}
- Principais dificuldades: ${d.dificuldades}

INSTRUÇÃO CRÍTICA: Guia FINAL e COMPLETO para esta pessoa. NÃO use placeholders. Tudo concreto e aplicável.

Gere em HTML puro (sem html/head/body). Use estas classes CSS exatamente:

CLASSES:
- Seção: <div class="secao"><div class="secao-topo"><span class="secao-num">01</span><span class="secao-titulo">TÍTULO</span></div>conteúdo</div>
- Destaque: <div class="box">...</div>
- Macros: <div class="macros"><div class="macro"><div class="v">2100</div><div class="u">kcal</div><div class="l">Calorias</div></div></div>
- Refeição: <div class="ref"><div class="ref-cab"><span class="ref-icone">🌅</span><span class="ref-titulo">Café da Manhã</span></div><div class="ref-corpo">...<div class="ref-sub">SUBSTITUIÇÕES</div>...</div></div>
- Tabela semana: <table class="tab"><thead><tr><th>Dia</th><th>Café</th><th>Almoço</th><th>Jantar</th></tr></thead><tbody>...</tbody></table>
- Compras: <div class="compras-bloco"><div class="compras-cat">PROTEÍNAS</div><ul class="compras-lista"><li>item</li></ul></div>
- Treino: <div class="treino-bloco"><h3>título</h3><table class="treino-tab"><thead><tr><th>Exercício</th><th>Séries</th><th>Reps</th><th>Descanso</th></tr></thead><tbody>...</tbody></table></div>
- Dica: <div class="dica"><span class="dica-icone">💧</span><div class="dica-texto"><strong>Título</strong>Texto</div></div>
- Resumo: <div class="resumo-grid"><div class="resumo-card"><div class="rc-label">META</div><div class="rc-val">2100 kcal</div><div class="rc-desc">por dia</div></div></div>
- Regra: <div class="regra"><span class="regra-n">1</span><span>texto</span></div>

GERE ESTAS 11 SEÇÕES:

01 — ANÁLISE DO SEU PERFIL: Cite ${d.nome} pelo nome. Interprete rotina e estilo de vida. Elogie pontos fortes genuinamente. Aponte atenções com empatia. Descreva os desafios específicos citados. Tom de consultório real.

02 — SUA ESTRATÉGIA NUTRICIONAL: Estratégia adotada para este perfil e por quê. Como o corpo de ${d.nome} vai responder. Linguagem simples.

03 — SEUS NÚMEROS: Calcule TDEE com Mifflin-St Jeor para os dados exatos. Defina calorias alvo. Distribua macros em gramas e %. Use classe macros com 4 cards: Calorias / Proteínas / Carboidratos / Gorduras. Explique cada número de forma simples.

04 — PLANO ALIMENTAR: 6 refeições com classe ref. Café (🌅), Lanche manhã (🍎), Almoço (🍽️), Lanche tarde (☀️), Jantar (🌙), Ceia (⭐ se necessário). Cada uma: sugestão principal com medidas caseiras + seção SUBSTITUIÇÕES com 2-3 opções. 100% adaptado às preferências e restrições de ${d.nome}.

05 — SEMANA ALIMENTAR: Tabela tab com Dia/Café/Almoço/Jantar. Segunda a domingo. Varie os alimentos.

06 — LISTA DE COMPRAS: 5 blocos compras-bloco: Proteínas / Carboidratos / Gorduras Boas / Verduras e Legumes / Temperos e Extras. Alimentos acessíveis.

07 — ORIENTAÇÕES PARA VOCÊ: 6 dicas personalizadas com classe dica. Inclua: hidratação, estratégia para as dificuldades específicas de ${d.nome}, organização com a rotina real, dias fora da dieta, consistência. Use psicologia de identidade.

08 — SEU TREINO: 2 blocos treino-bloco: VERSÃO ACADEMIA e VERSÃO CASA. Tabela treino-tab com Exercício/Séries/Reps/Descanso. Mínimo 6 exercícios cada.

09 — ESTILO DE VIDA: Sono, estresse, hábitos. Se dificuldades são emocionais, aborde com profundidade. Texto corrido.

10 — RESUMO RÁPIDO: resumo-grid com 4 cards: Meta Calórica / Proteína Diária / Estratégia / Regra de Ouro. Depois 3 regras com classe regra.

11 — MENSAGEM FINAL OBRIGATÓRIA: Use EXATAMENTE esta estrutura e NÃO deixe incompleta:
<div class="final"><div class="final-sep"></div><h2>Título motivador para ${d.nome}</h2><p>Parágrafo 1 curto sobre a jornada específica de ${d.nome}.</p><p>Parágrafo 2 curto sobre identidade: quem ${d.nome} está se tornando.</p><p>Parágrafo 3 curto reforçando consistência sem promessas milagrosas.</p><div class="final-ass">Com carinho e dedicação,</div><div class="final-cargo">Seu Nutricionista</div></div>

REGRAS ABSOLUTAS: Calcule com precisão. Cite ${d.nome} naturalmente. NUNCA mencione IA ou tecnologia. ZERO genérico. A seção 11 DEVE terminar com final-ass e final-cargo. Retorne APENAS HTML puro, sem markdown, sem backticks.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 10000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const html = data.content.map((c) => c.text || "").join("");
    res.status(200).json({ html });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar o guia." });
  }
}
