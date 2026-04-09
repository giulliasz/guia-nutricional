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
- Nível de atividade física atual: ${d.nivel_atividade}
- Disponibilidade para exercícios: ${d.disponibilidade_exercicio}
- Condição financeira para exercícios: ${d.condicao_financeira}
- Ânimo e disposição para exercícios: ${d.animo_exercicio}
- Rotina diária: ${d.rotina}
- Hábitos alimentares atuais: ${d.habitos}
- Restrições/alergias: ${d.restricoes || "Nenhuma"}
- Preferências alimentares: ${d.preferencias}
- Principais dificuldades: ${d.dificuldades}

INSTRUÇÃO CRÍTICA: Guia FINAL e COMPLETO para esta pessoa específica. NÃO use placeholders. Tudo concreto e aplicável à realidade dela.

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

GERE ESTAS 12 SEÇÕES EM ORDEM:

01 — ANÁLISE DO SEU PERFIL: Cite ${d.nome} pelo nome. Calcule e mostre o IMC (peso/altura²) com classificação. Interprete a rotina e estilo de vida de forma personalizada. Elogie pontos fortes genuinamente. Aponte atenções com empatia. Descreva os desafios específicos citados e como o plano foi pensado para eles.

02 — SUA ESTRATÉGIA NUTRICIONAL: Estratégia adotada (déficit calórico, superávit, recomposição etc.) e por quê para este perfil. Como o corpo de ${d.nome} vai responder. Linguagem simples e direta.

03 — SEUS NÚMEROS: Calcule TDEE com fórmula Mifflin-St Jeor para os dados exatos. Mostre o cálculo passo a passo de forma simples. Defina calorias alvo. Distribua macros em gramas e %. Calcule e mostre a quantidade de água diária recomendada (em litros e copos de 200ml) baseada no peso e objetivo. Use classe macros com 4 cards: Calorias / Proteínas / Carboidratos / Gorduras. Após os cards, adicione destaque especial para a meta de hidratação diária com box.

04 — PLANO ALIMENTAR: 6 refeições com classe ref. Café (🌅), Lanche manhã (🍎), Almoço (🍽️), Lanche tarde (☀️), Jantar (🌙), Ceia (⭐ se necessário). Cada uma: sugestão principal com medidas caseiras + seção SUBSTITUIÇÕES com 2-3 opções. 100% adaptado às preferências e restrições de ${d.nome}.

05 — SEMANA ALIMENTAR: Tabela tab com Dia/Café/Almoço/Jantar. Segunda a domingo. Varie os alimentos.

06 — LISTA DE COMPRAS: 5 blocos compras-bloco: Proteínas / Carboidratos / Gorduras Boas / Verduras e Legumes / Temperos e Extras. Alimentos acessíveis e práticos.

07 — ORIENTAÇÕES COMPORTAMENTAIS: 6 dicas personalizadas com classe dica. Inclua: meta de hidratação diária com estratégia prática, como lidar com as dificuldades específicas citadas, organização com a rotina real, dias fora da dieta, consistência. Use psicologia de identidade.

08 — SEU TREINO PERSONALIZADO: IMPORTANTE — adapte completamente ao perfil de exercício informado:
- Se tem academia disponível e está motivado: treino de musculação estruturado
- Se prefere casa: treino funcional/peso corporal adaptado ao espaço
- Se prefere esportes ou atividades ao ar livre: sugira esporte específico adequado ao objetivo + planejamento de frequência
- Se tem pouco ânimo: comece com algo muito simples e prazeroso, evoluindo gradualmente
- Se sem condições financeiras: alternativas gratuitas criativas
Crie 2 blocos treino-bloco adaptados à realidade de ${d.nome}. Tabela treino-tab com Exercício/Séries/Reps/Descanso. Mínimo 6 exercícios por bloco.

09 — SUPLEMENTOS E SAÚDE PREVENTIVA: Baseado no perfil, objetivo, alimentação e rotina de ${d.nome}, avalie e indique de forma responsável:
- Vitaminas ou minerais que podem estar deficientes (ex: vitamina D, B12, ferro, magnésio) com justificativa
- Se há indicação de vermífugo preventivo baseado nos hábitos alimentares
- Outros suplementos relevantes para o objetivo (ex: proteína, creatina, ômega-3)
- Reforce sempre que qualquer suplemento deve ser confirmado com médico
Use boxes e linguagem acessível.

10 — ESTILO DE VIDA: Sono, estresse, hábitos que impactam os resultados. Se dificuldades são emocionais, aborde com profundidade. Texto corrido e fluido.

11 — RESUMO RÁPIDO: resumo-grid com 4 cards: Meta Calórica / Proteína Diária / Água Diária / Regra de Ouro. Depois 3 regras principais com classe regra.

12 — MENSAGEM FINAL OBRIGATÓRIA: Use EXATAMENTE esta estrutura HTML completa:
<div class="final"><div class="final-sep"></div><h2>[título motivador e humano direcionado a ${d.nome}]</h2><p>[Escreva um texto corrido de 8 a 15 linhas, sem listas, como uma conversa real de nutricionista encerrando o acompanhamento. Tom: acolhedor, confiante, experiente. Inclua: validação das dificuldades específicas de ${d.nome}, reforço de que pequenas ações geram grandes resultados, importância da rotina e disciplina leve, incentivo para seguir mesmo em dias imperfeitos, sensação de acompanhamento mesmo sendo um PDF. Evite clichês como "nunca desista". Sem promessas milagrosas. Mencione o nome ${d.nome} naturalmente.]</p><div class="final-ass">Com carinho e dedicação,</div><div class="final-cargo">Seu Nutricionista</div></div>

REGRAS ABSOLUTAS: Calcule todos os números com precisão para os dados informados. Cite ${d.nome} naturalmente ao longo do texto. NUNCA mencione IA, sistema ou tecnologia. ZERO conteúdo genérico. A seção 12 DEVE terminar com final-ass e final-cargo obrigatoriamente. Retorne APENAS HTML puro, sem markdown, sem backticks.`;

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
        max_tokens: 12000,
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
