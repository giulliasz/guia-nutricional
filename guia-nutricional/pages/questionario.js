import { useState, useCallback } from 'react';

const COR = {
  v1:'#0a1f0e', v2:'#0d2810', v3:'#1a4a20',
  creme:'#f5f0e0', laranja:'#e8934a', laranja2:'#f0a85a', laranja3:'#fac070', claro:'#8fcf9a'
};

function Opcao({ selecionado, onClick, label, sub }) {
  return (
    <div
      onClick={onClick}
      style={{
        display:'flex', alignItems:'flex-start', gap:12,
        background: selecionado ? 'rgba(232,147,74,0.1)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selecionado ? 'rgba(232,147,74,0.35)' : 'rgba(245,240,224,0.08)'}`,
        padding:'14px 16px', cursor:'pointer', marginBottom:8,
        userSelect:'none', WebkitUserSelect:'none',
      }}
    >
      <div style={{
        width:20, height:20, flexShrink:0, marginTop:1,
        border:`1px solid ${selecionado ? COR.laranja : 'rgba(245,240,224,0.2)'}`,
        background: selecionado ? COR.laranja : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:11, color: selecionado ? COR.v1 : 'transparent',
        fontWeight:700,
      }}>✓</div>
      <div>
        <div style={{fontSize:13, fontWeight:600, color:COR.creme, marginBottom:sub?2:0}}>{label}</div>
        {sub && <div style={{fontSize:12, fontWeight:300, color:'rgba(245,240,224,0.4)', lineHeight:1.5}}>{sub}</div>}
      </div>
    </div>
  );
}

const inp = {
  width:'100%', background:'rgba(255,255,255,0.04)',
  border:'1px solid rgba(245,240,224,0.12)', color:'#f5f0e0',
  fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300,
  padding:'13px 15px', outline:'none', boxSizing:'border-box',
  marginBottom:0,
};

const sel = {
  ...inp, background:'#0d2810', WebkitAppearance:'none',
};

const ta = {
  ...inp, resize:'vertical', minHeight:90, lineHeight:1.6,
};

const lbl = {
  display:'block', fontSize:13, fontWeight:600,
  color:'#f5f0e0', marginBottom:8, letterSpacing:0.3,
};

export default function Questionario() {
  const [step, setStep] = useState(0);
  const [fase, setFase] = useState('form'); // form | loading | done
  const [guia, setGuia] = useState('');
  const [d, setD] = useState({
    nome:'', idade:'', sexo:'', peso:'', altura:'',
    objetivo:'',
    rotina_trabalho:'', horario_acordar:'', tempo_cozinhar:'', rotina_detalhe:'',
    num_refeicoes:'', restricoes:[], nao_gosta:'', mais_gosta:'', alimentacao_atual:'',
    pratica_exercicio:'', academia:'', tempo_treino:'', atividades_gosta:'',
    condicoes:[], sono:'', estresse:'', medicamentos:'',
    dificuldades:[], tentativas:'', obstaculo:'',
    personalidade:[], meta:'', extra:'', email:'',
  });

  const upd = useCallback((k, v) => setD(prev => ({...prev, [k]: v})), []);

  const toggle = useCallback((k, v) => setD(prev => {
    const arr = prev[k] || [];
    return {...prev, [k]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]};
  }), []);

  function radio(k, v) {
    return (
      <Opcao
        key={v}
        selecionado={d[k] === v}
        onClick={() => upd(k, v)}
        label={v}
        sub={null}
      />
    );
  }

  function validate() {
    if (step === 0) {
      if (!d.nome.trim()) { alert('Informe seu nome.'); return false; }
      if (!d.idade) { alert('Informe sua idade.'); return false; }
      if (!d.sexo) { alert('Selecione seu sexo.'); return false; }
      if (!d.peso) { alert('Informe seu peso.'); return false; }
      if (!d.altura) { alert('Informe sua altura.'); return false; }
      if (!d.objetivo) { alert('Selecione seu objetivo.'); return false; }
    }
    if (step === 1 && !d.rotina_trabalho) { alert('Selecione sua rotina.'); return false; }
    if (step === 2 && !d.num_refeicoes) { alert('Selecione quantas refeições faz.'); return false; }
    if (step === 3) {
      if (!d.pratica_exercicio) { alert('Selecione seu nível de atividade.'); return false; }
      if (!d.academia) { alert('Selecione sua preferência de treino.'); return false; }
    }
    if (step === 6 && !d.email) { alert('Informe seu e-mail.'); return false; }
    return true;
  }

  function next() {
    if (!validate()) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function prev() {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function gerar() {
    if (!validate()) return;
    setFase('loading');

    const peso = parseFloat(d.peso);
    const altura = parseFloat(d.altura);
    const imc = (peso && altura) ? (peso / Math.pow(altura / 100, 2)).toFixed(1) : 'não calculado';

    const prompt = `Você é nutricionista experiente, 15 anos de atuação.

DADOS:
- Nome: ${d.nome} | Idade: ${d.idade} | Sexo: ${d.sexo}
- Peso: ${d.peso}kg | Altura: ${d.altura}cm | IMC: ${imc}
- Objetivo: ${d.objetivo}
- Rotina: ${d.rotina_trabalho} | Acorda: ${d.horario_acordar}
- Cozinhar: ${d.tempo_cozinhar} | Detalhe: ${d.rotina_detalhe || 'não informado'}
- Refeições: ${d.num_refeicoes} | Restrições: ${d.restricoes.join(', ') || 'nenhuma'}
- Orçamento semanal: ${d.orcamento || 'não informado'}
- Não gosta: ${d.nao_gosta || 'nada'} | Gosta: ${d.mais_gosta || 'não informado'}
- Alimentação atual: ${d.alimentacao_atual || 'não informado'}
- Exercício: ${d.pratica_exercicio} | Academia: ${d.academia} | Tempo treino: ${d.tempo_treino || 'não informado'}
- Atividades interesse: ${d.atividades_gosta || 'não informado'}
- Saúde: ${d.condicoes.join(', ') || 'nenhuma'} | Sono: ${d.sono} | Estresse: ${d.estresse}
- Medicamentos: ${d.medicamentos || 'nenhum'}
- Dificuldades: ${d.dificuldades.join(', ') || 'nenhuma'}
- Tentativas: ${d.tentativas || 'não informado'} | Obstáculo: ${d.obstaculo || 'não informado'}
- Personalidade: ${d.personalidade.join(', ') || 'não informado'}
- Meta: ${d.meta || 'não informada'} | Extra: ${d.extra || 'nada'}

Crie um GUIA NUTRICIONAL E DE TREINO COMPLETO E PERSONALIZADO em português brasileiro.

# GUIA NUTRICIONAL PERSONALIZADO
## ${d.nome} | Objetivo: ${d.objetivo}
---
## 1. ANÁLISE DO SEU PERFIL
[Análise, IMC ${imc} com classificação, pontos positivos e atenção]
## 2. SEUS NÚMEROS
- TMB, GET, meta calórica, macros em gramas e %
## 3. ESTRATÉGIA NUTRICIONAL
## 4. PLANO ALIMENTAR COMPLETO
[Cada refeição: sugestão + substituições + quantidades + calorias]
## 5. PLANEJAMENTO SEMANAL
## 6. LISTA DE COMPRAS
## 7. SUPLEMENTOS E VITAMINAS RECOMENDADOS
[Dosagem e motivo para cada um]
## 8. ORIENTAÇÕES COMPORTAMENTAIS
## 9. TREINO PERSONALIZADO
[Se academia: exercícios/séries/reps/descanso. Se não: corpo livre + esportes recomendados]
## 10. ESTILO DE VIDA
## 11. RESUMO RÁPIDO
## 12. MENSAGEM FINAL
[8-15 linhas, texto corrido, humanizado, motivador]`;

    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, nome: d.nome }),
      });
      const result = await res.json();
      if (result.content) {
        setGuia(result.content);
        setFase('done');
      } else {
        throw new Error(result.error || 'Sem conteúdo');
      }
    } catch (e) {
      alert('Erro: ' + e.message);
      setFase('form');
    }
  }

  function abrirPDF() {
    const html = guia
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/[*][*](.*?)[*][*]/g, '<strong>$1</strong>')
      .replace(/[*](.*?)[*]/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\n/g, '<br>');

    const page = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Guia Nutricional - ${d.nome}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;background:#fff;color:#1a1a1a;padding:40px;font-size:14px;line-height:1.9;max-width:800px;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
h1{font-size:26px;font-weight:700;color:#1a3a1a;margin:32px 0 8px;border-bottom:3px solid #2d6a35;padding-bottom:8px;text-align:center;}
h2{font-size:20px;font-weight:700;color:#1a3a1a;margin:28px 0 8px;padding:8px 16px;background:#f0f9f0;border-left:4px solid #2d6a35;}
h3{font-size:14px;font-weight:700;color:#2d6a35;margin:16px 0 5px;text-transform:uppercase;letter-spacing:1px;}
p{margin-bottom:10px;text-align:justify;}
strong{color:#1a1a1a;font-weight:700;}
em{font-style:italic;color:#2d6a35;}
li{margin-left:20px;margin-bottom:5px;}
hr{border:none;border-top:2px solid #e0e0e0;margin:24px 0;}
.topo{background:linear-gradient(135deg,#1a4a20,#2d6a35);padding:32px;margin-bottom:32px;text-align:center;}
.topo h1{color:#ffffff;border:none;font-size:32px;margin:0 0 6px;}
.topo p{font-size:12px;color:rgba(255,255,255,0.7);margin:0;}
.btn{position:fixed;top:12px;right:12px;background:#2d6a35;color:#fff;border:none;font-weight:700;font-size:13px;padding:10px 20px;cursor:pointer;z-index:999;}
@media print{.btn{display:none;} body{padding:20px;}}
</style></head><body>
<button class="btn" onclick="window.print()">Salvar PDF</button>
<div class="topo"><h1>Guia Nutricional Personalizado</h1><p>Seu Nutricionista - Exclusivo para ${d.nome}</p></div>
${html}</body></html>`;

    const blob = new Blob([page], { type: 'text/html;charset=utf-8' });
    window.open(URL.createObjectURL(blob), '_blank');
  }

  const TOTAL = 7;
  const pct = (step / TOTAL) * 100;

  const bodyStyle = {
    background: COR.v1, minHeight: '100vh',
    fontFamily: "'Jost', sans-serif", color: COR.creme, paddingBottom: 60,
  };

  // LOADING
  if (fase === 'loading') return (
    <div style={{ ...bodyStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div style={{ width: 52, height: 52, border: '2px solid rgba(232,147,74,0.2)', borderTopColor: COR.laranja, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
        <p style={{ fontFamily: 'serif', fontSize: 26, fontStyle: 'italic', color: COR.creme, marginBottom: 10 }}>Criando seu guia...</p>
        <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.45)', lineHeight: 1.8 }}>Analisando suas informações e montando<br />um plano exclusivo para você.<br /><br />Aguarde alguns instantes.</p>
      </div>
    </div>
  );

  // DONE
  if (fase === 'done') return (
    <div style={{ ...bodyStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: 'serif', fontSize: 38, fontWeight: 700, color: COR.creme, marginBottom: 10 }}>
          Seu guia está <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>pronto!</em>
        </h2>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(245,240,224,0.55)', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.8 }}>
          Seu guia nutricional e de treino 100% personalizado foi gerado. Clique abaixo para baixar.
        </p>
        <button
          onClick={abrirPDF}
          style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', padding: '18px 48px', cursor: 'pointer' }}
        >⬇️ Baixar meu guia em PDF</button>
        <p style={{ marginTop: 12, fontSize: 11, color: 'rgba(245,240,224,0.2)', letterSpacing: 1 }}>Acesso vitalício · Exclusivo para você</p>
      </div>
    </div>
  );

  // FORM
  return (
    <div style={bodyStyle}>
      <nav style={{ background: 'rgba(10,31,14,0.97)', borderBottom: '1px solid rgba(143,207,154,0.07)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'serif', fontSize: 18, fontStyle: 'italic', fontWeight: 600, color: COR.creme }}>Seu <span style={{ color: COR.laranja2 }}>Nutricionista</span></div>
        <span style={{ fontSize: 11, letterSpacing: 2, color: 'rgba(245,240,224,0.3)', textTransform: 'uppercase' }}>Passo {step + 1} de {TOTAL}</span>
      </nav>
      <div style={{ background: 'rgba(255,255,255,0.04)', height: 3 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${COR.v3},${COR.laranja})`, width: pct + '%', transition: 'width 0.5s' }} />
      </div>

      <div style={{ textAlign: 'center', padding: '44px 24px 28px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(232,147,74,0.25)', color: COR.laranja3, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', padding: '7px 20px', marginBottom: 18 }}>✦ Guia Personalizado</div>
        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(24px,5vw,44px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 10 }}>
          Vamos conhecer<br /><em style={{ fontStyle: 'italic', color: COR.laranja2 }}>você de verdade.</em>
        </h1>
        <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.5)', maxWidth: 420, margin: '0 auto', lineHeight: 1.8 }}>Quanto mais detalhes, mais personalizado será seu guia.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '0 24px 24px', flexWrap: 'wrap' }}>
        {[1,2,3,4,5,6,7].map((n, i) => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: '50%',
            border: `1px solid ${i < step ? COR.claro : i === step ? COR.laranja : 'rgba(245,240,224,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600,
            color: i < step ? COR.v1 : i === step ? COR.laranja : 'rgba(245,240,224,0.25)',
            background: i < step ? COR.claro : i === step ? 'rgba(232,147,74,0.1)' : 'transparent',
          }}>{n}</div>
        ))}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px' }}>

        {/* ─── STEP 1 ─── */}
        {step === 0 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>01 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Dados <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>pessoais</em></h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.45)', lineHeight: 1.7 }}>Informações básicas para personalizar seu plano.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Nome completo *</label>
            <input style={inp} value={d.nome} onChange={e => upd('nome', e.target.value)} placeholder="Seu nome completo" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={lbl}>Idade *</label>
              <input style={inp} type="number" value={d.idade} onChange={e => upd('idade', e.target.value)} placeholder="Ex: 28" />
            </div>
            <div>
              <label style={lbl}>Sexo *</label>
              <select style={sel} value={d.sexo} onChange={e => upd('sexo', e.target.value)}>
                <option value="">Selecione</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="prefiro não informar">Prefiro não informar</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={lbl}>Peso (kg) *</label>
              <input style={inp} type="number" value={d.peso} onChange={e => upd('peso', e.target.value)} placeholder="Ex: 68" />
            </div>
            <div>
              <label style={lbl}>Altura (cm) *</label>
              <input style={inp} type="number" value={d.altura} onChange={e => upd('altura', e.target.value)} placeholder="Ex: 165" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Objetivo principal *</label>
            {[
              ['emagrecer', 'Emagrecer', 'Reduzir gordura e melhorar composição'],
              ['ganhar massa', 'Ganhar massa muscular', 'Aumentar músculo e força'],
              ['saude geral', 'Melhorar a saúde geral', 'Mais energia e bem-estar'],
              ['definicao', 'Definição muscular', 'Manter massa e reduzir gordura'],
              ['performance', 'Melhorar performance', 'Mais energia e resistência'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.objetivo === v} onClick={() => upd('objetivo', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
            <button onClick={next} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', padding: '14px 36px', cursor: 'pointer' }}>Continuar →</button>
          </div>
        </>}

        {/* ─── STEP 2 ─── */}
        {step === 1 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>02 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Sua <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>rotina diária</em></h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.45)', lineHeight: 1.7 }}>Entender sua rotina é essencial para criar um plano que você vai seguir.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Rotina de trabalho *</label>
            {[
              ['escritório / sentado', 'Trabalho sentado / escritório', 'Pouco movimento'],
              ['trabalho em pé', 'Trabalho em pé ou em movimento', 'Bastante atividade no trabalho'],
              ['trabalho pesado', 'Trabalho físico pesado', 'Esforço intenso diariamente'],
              ['home office', 'Home office', 'Flexibilidade de horários'],
              ['estudante', 'Estudante', 'Rotina de estudos'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.rotina_trabalho === v} onClick={() => upd('rotina_trabalho', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Horário que acorda</label>
            <select style={sel} value={d.horario_acordar} onChange={e => upd('horario_acordar', e.target.value)}>
              <option value="">Selecione</option>
              <option value="antes das 5h">Antes das 5h</option>
              <option value="entre 5h e 7h">Entre 5h e 7h</option>
              <option value="entre 7h e 9h">Entre 7h e 9h</option>
              <option value="depois das 9h">Depois das 9h</option>
              <option value="horário variado">Horário variado / plantão</option>
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Tempo para preparar refeições *</label>
            {[
              ['gosto de cozinhar', 'Sim, gosto de cozinhar', 'Tenho tempo e disposição'],
              ['pouco tempo', 'Tenho pouco tempo', 'Preciso de refeições rápidas'],
              ['raramente cozinho', 'Raramente cozinho', 'Como fora ou peço delivery'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.tempo_cozinhar === v} onClick={() => upd('tempo_cozinhar', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Detalhe sua rotina <span style={{ fontWeight: 300, color: 'rgba(245,240,224,0.3)' }}>(opcional mas importante)</span></label>
            <textarea style={ta} value={d.rotina_detalhe} onChange={e => upd('rotina_detalhe', e.target.value)} placeholder="Ex: acordo às 6h, trabalho das 8h às 18h..." />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' }}>← Voltar</button>
            <button onClick={next} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', padding: '13px 32px', cursor: 'pointer', flex: 1 }}>Continuar →</button>
          </div>
        </>}

        {/* ─── STEP 3 ─── */}
        {step === 2 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>03 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Hábitos <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>alimentares</em></h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.45)', lineHeight: 1.7 }}>Como você come hoje para criar o melhor plano alimentar.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Refeições por dia *</label>
            {['2 refeições', '3 refeições', '4 refeições', '5 ou mais'].map(v => (
              <Opcao key={v} selecionado={d.num_refeicoes === v} onClick={() => upd('num_refeicoes', v)} label={v} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Restrições alimentares</label>
            {['Nenhuma restrição', 'Vegetariano', 'Vegano', 'Intolerante à lactose', 'Intolerante ao glúten', 'Alergia a frutos do mar'].map(v => (
              <Opcao key={v} selecionado={d.restricoes.includes(v)} onClick={() => toggle('restricoes', v)} label={v} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Qual seu orçamento semanal para alimentação?</label>
            {[
              ['até R$50/semana', 'Baixo — até R$50 por semana', 'Preciso de opções muito baratas'],
              ['R$50 a R$100/semana', 'Médio — R$50 a R$100 por semana', 'Ingredientes acessíveis'],
              ['R$100 a R$200/semana', 'Bom — R$100 a R$200 por semana', 'Variedade razoável'],
              ['acima de R$200/semana', 'Confortável — acima de R$200 por semana', 'Sem restrições de orçamento'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.orcamento === v} onClick={() => upd('orcamento', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Alimentos que NÃO gosta</label>
            <textarea style={ta} value={d.nao_gosta} onChange={e => upd('nao_gosta', e.target.value)} placeholder="Ex: brócolis, fígado, peixe..." />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Alimentos que MAIS gosta</label>
            <textarea style={ta} value={d.mais_gosta} onChange={e => upd('mais_gosta', e.target.value)} placeholder="Ex: frango, arroz, banana, ovos..." />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Como é sua alimentação hoje</label>
            <textarea style={ta} value={d.alimentacao_atual} onChange={e => upd('alimentacao_atual', e.target.value)} placeholder="Ex: pulo o café, almoço no trabalho..." />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' }}>← Voltar</button>
            <button onClick={next} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', padding: '13px 32px', cursor: 'pointer', flex: 1 }}>Continuar →</button>
          </div>
        </>}

        {/* ─── STEP 4 ─── */}
        {step === 3 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>04 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Atividade <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>física</em></h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.45)', lineHeight: 1.7 }}>Vamos montar o treino ideal para você.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Pratica exercícios atualmente? *</label>
            {[
              ['Não pratico', 'Não pratico exercícios', 'Sedentário no momento'],
              ['Raramente', 'Raramente', '1 vez por semana ou menos'],
              ['Moderado (2-3x/semana)', 'Moderado', '2 a 3 vezes por semana'],
              ['Frequente (4-5x/semana)', 'Frequente', '4 a 5 vezes por semana'],
              ['Diário', 'Diário', 'Todos os dias'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.pratica_exercicio === v} onClick={() => upd('pratica_exercicio', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Academia ou treino em casa? *</label>
            {[
              ['Sim, tenho academia', 'Sim, tenho academia', 'Tenho acesso e disposição'],
              ['Quero começar na academia', 'Quero começar na academia', 'Ainda não tenho mas quero'],
              ['Prefiro treinar em casa', 'Prefiro treinar em casa', 'Sem academia'],
              ['Sem condições no momento', 'Sem condições no momento', 'Treino sem equipamentos'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.academia === v} onClick={() => upd('academia', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Tempo disponível para treinar</label>
            {['Até 30 minutos', '30 a 60 minutos', '1 a 2 horas', 'Mais de 2 horas'].map(v => (
              <Opcao key={v} selecionado={d.tempo_treino === v} onClick={() => upd('tempo_treino', v)} label={v} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Atividades que gosta ou tem interesse</label>
            <textarea style={ta} value={d.atividades_gosta} onChange={e => upd('atividades_gosta', e.target.value)} placeholder="Ex: gosto de caminhar, quero natação..." />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' }}>← Voltar</button>
            <button onClick={next} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', padding: '13px 32px', cursor: 'pointer', flex: 1 }}>Continuar →</button>
          </div>
        </>}

        {/* ─── STEP 5 ─── */}
        {step === 4 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>05 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Saúde e <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>bem-estar</em></h2>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Condição de saúde diagnosticada</label>
            {['Nenhuma', 'Diabetes ou pré-diabetes', 'Hipertensão', 'Colesterol alto', 'Hipotireoidismo', 'SOP', 'Outra condição'].map(v => (
              <Opcao key={v} selecionado={d.condicoes.includes(v)} onClick={() => toggle('condicoes', v)} label={v} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Qualidade do sono</label>
            {[
              ['Ruim (menos de 6h)', 'Ruim', 'Menos de 6h ou interrompido'],
              ['Regular (6-7h)', 'Regular', '6 a 7h'],
              ['Bom (7-8h)', 'Bom', '7 a 8h, acordo descansado'],
              ['Ótimo (mais de 8h)', 'Ótimo', 'Mais de 8h'],
            ].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.sono === v} onClick={() => upd('sono', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Nível de estresse</label>
            {[['Baixo', 'Baixo', 'Vida tranquila'], ['Moderado', 'Moderado', 'Consigo gerenciar'], ['Alto', 'Alto', 'Muito estressado com frequência']].map(([v, l, sub]) => (
              <Opcao key={v} selecionado={d.estresse === v} onClick={() => upd('estresse', v)} label={l} sub={sub} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Medicamentos ou suplementos que usa</label>
            <textarea style={ta} value={d.medicamentos} onChange={e => upd('medicamentos', e.target.value)} placeholder="Ex: anticoncepcional, vitamina D..." />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' }}>← Voltar</button>
            <button onClick={next} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', padding: '13px 32px', cursor: 'pointer', flex: 1 }}>Continuar →</button>
          </div>
        </>}

        {/* ─── STEP 6 ─── */}
        {step === 5 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>06 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Suas <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>dificuldades</em></h2>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Maiores dificuldades com alimentação</label>
            {['Compulsão alimentar', 'Falta de tempo', 'Como muito fora de casa', 'Vício em doce/ultraprocessados', 'Falta de consistência', 'Como por ansiedade'].map(v => (
              <Opcao key={v} selecionado={d.dificuldades.includes(v)} onClick={() => toggle('dificuldades', v)} label={v} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Tentativas anteriores de dieta</label>
            <textarea style={ta} value={d.tentativas} onChange={e => upd('tentativas', e.target.value)} placeholder="Ex: tentei low carb, jejum..." />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Maior obstáculo para seu objetivo</label>
            <textarea style={ta} value={d.obstaculo} onChange={e => upd('obstaculo', e.target.value)} placeholder="Ex: rotina agitada, falta de motivação..." />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' }}>← Voltar</button>
            <button onClick={next} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', padding: '13px 32px', cursor: 'pointer', flex: 1 }}>Continuar →</button>
          </div>
        </>}

        {/* ─── STEP 7 ─── */}
        {step === 6 && <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: COR.laranja, display: 'block', marginBottom: 6 }}>07 / 07</span>
            <h2 style={{ fontFamily: 'serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Sobre <em style={{ fontStyle: 'italic', color: COR.laranja2 }}>você</em></h2>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Como você se descreveria</label>
            {['Disciplinado quando tenho um plano claro', 'Preciso de motivação constante', 'Gosto de variedade nas refeições', 'Prefiro rotina fixa', 'Vida social ativa (como fora com frequência)'].map(v => (
              <Opcao key={v} selecionado={d.personalidade.includes(v)} onClick={() => toggle('personalidade', v)} label={v} />
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Meta específica</label>
            <input style={inp} value={d.meta} onChange={e => upd('meta', e.target.value)} placeholder="Ex: quero chegar a 60kg em 3 meses..." />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Algo mais que queira nos contar? <span style={{ fontWeight: 300, color: 'rgba(245,240,224,0.3)' }}>— muito importante!</span></label>
            <textarea style={{ ...ta, minHeight: 120 }} value={d.extra} onChange={e => upd('extra', e.target.value)} placeholder="Qualquer informação adicional..." />
            <p style={{ fontSize: 11, color: 'rgba(245,240,224,0.3)', marginTop: 5 }}>Quanto mais você contar, melhor será seu guia!</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Seu e-mail *</label>
            <input style={inp} type="email" value={d.email} onChange={e => upd('email', e.target.value)} placeholder="seuemail@exemplo.com" />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={prev} style={{ background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' }}>← Voltar</button>
            <button onClick={gerar} style={{ background: COR.laranja, color: COR.v1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '13px 24px', cursor: 'pointer', flex: 1 }}>🥗 Gerar meu guia personalizado</button>
          </div>
        </>}

      </div>
    </div>
  );
}
