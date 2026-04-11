import { useState } from 'react';

const VERDE1 = '#0a1f0e';
const VERDE3 = '#1a4a20';
const LARANJA = '#e8934a';
const LARANJA2 = '#f0a85a';
const LARANJA3 = '#fac070';
const CREME = '#f5f0e0';
const CLARO = '#8fcf9a';

const s = {
  body: { background: VERDE1, minHeight: '100vh', fontFamily: "'Jost', sans-serif", color: CREME, paddingBottom: 60 },
  nav: { background: 'rgba(10,31,14,0.97)', borderBottom: '1px solid rgba(143,207,154,0.07)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', fontWeight: 600, color: CREME },
  logoSpan: { color: LARANJA2 },
  progressWrap: { background: 'rgba(255,255,255,0.04)', height: 3 },
  progressBar: (pct) => ({ height: 3, background: `linear-gradient(90deg,${VERDE3},${LARANJA})`, width: pct + '%', transition: 'width 0.5s ease' }),
  hero: { textAlign: 'center', padding: '50px 24px 32px' },
  badge: { display: 'inline-block', border: `1px solid rgba(232,147,74,0.25)`, color: LARANJA3, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', padding: '7px 20px', marginBottom: 20 },
  h1: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px,5vw,46px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 10 },
  h1em: { fontStyle: 'italic', color: LARANJA2 },
  heroSub: { fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.5)', maxWidth: 440, margin: '0 auto', lineHeight: 1.8 },
  stepsNav: { display: 'flex', justifyContent: 'center', gap: 8, padding: '0 24px 28px', flexWrap: 'wrap' },
  dot: (active, done) => ({
    width: 32, height: 32, borderRadius: '50%',
    border: `1px solid ${done ? CLARO : active ? LARANJA : 'rgba(245,240,224,0.1)'}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 600, cursor: 'pointer',
    color: done ? VERDE1 : active ? LARANJA : 'rgba(245,240,224,0.25)',
    background: done ? CLARO : active ? 'rgba(232,147,74,0.1)' : 'transparent',
  }),
  container: { maxWidth: 660, margin: '0 auto', padding: '0 24px' },
  stepNum: { fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: LARANJA, marginBottom: 8, display: 'block' },
  stepH2: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 8 },
  stepSub: { fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.45)', lineHeight: 1.7, marginBottom: 28 },
  campo: { marginBottom: 22 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: CREME, marginBottom: 8 },
  input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,240,224,0.1)', color: CREME, fontFamily: "'Jost',sans-serif", fontSize: 14, fontWeight: 300, padding: '13px 15px', outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', background: '#0d2810', border: '1px solid rgba(245,240,224,0.1)', color: CREME, fontFamily: "'Jost',sans-serif", fontSize: 14, padding: '13px 15px', outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,240,224,0.1)', color: CREME, fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 300, padding: '13px 15px', outline: 'none', resize: 'vertical', minHeight: 90, lineHeight: 1.6, boxSizing: 'border-box' },
  op: (sel) => ({ display: 'flex', alignItems: 'flex-start', gap: 12, background: sel ? 'rgba(232,147,74,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${sel ? 'rgba(232,147,74,0.25)' : 'rgba(245,240,224,0.08)'}`, padding: '13px 15px', cursor: 'pointer', marginBottom: 7, transition: 'all 0.2s' }),
  opCheck: (sel) => ({ width: 20, height: 20, border: `1px solid ${sel ? LARANJA : 'rgba(245,240,224,0.2)'}`, background: sel ? LARANJA : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, color: sel ? VERDE1 : 'transparent', marginTop: 1 }),
  opStrong: { display: 'block', fontSize: 13, fontWeight: 600, color: CREME, marginBottom: 2 },
  opSpan: { fontSize: 12, fontWeight: 300, color: 'rgba(245,240,224,0.4)', lineHeight: 1.5 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  btnNav: { display: 'flex', gap: 12, marginTop: 32, justifyContent: 'space-between' },
  btnPrev: { background: 'transparent', border: '1px solid rgba(245,240,224,0.1)', color: 'rgba(245,240,224,0.4)', fontFamily: "'Jost',sans-serif", fontSize: 13, padding: '13px 24px', cursor: 'pointer' },
  btnNext: { background: LARANJA, color: VERDE1, border: 'none', fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '13px 32px', cursor: 'pointer', flex: 1 },
  divLine: { width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(232,147,74,0.2),transparent)', margin: '24px 0' },
  loadWrap: { textAlign: 'center', padding: '80px 24px' },
  spinner: { width: 56, height: 56, border: '2px solid rgba(232,147,74,0.2)', borderTopColor: LARANJA, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' },
  loadH: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,3vw,28px)', fontStyle: 'italic', color: CREME, marginBottom: 8 },
  loadSub: { fontSize: 13, fontWeight: 300, color: 'rgba(245,240,224,0.4)', lineHeight: 1.8 },
  resWrap: { textAlign: 'center', padding: '60px 24px' },
  resH: { fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,5vw,44px)', fontWeight: 700, color: CREME, marginBottom: 10 },
  resHem: { fontStyle: 'italic', color: LARANJA2 },
  resSub: { fontSize: 14, fontWeight: 300, color: 'rgba(245,240,224,0.55)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.8 },
  btnDl: { background: LARANJA, color: VERDE1, border: 'none', fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', padding: '18px 48px', cursor: 'pointer' },
};

export default function Questionario() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [guia, setGuia] = useState('');
  const [dados, setDados] = useState({
    nome:'', idade:'', sexo:'', peso:'', altura:'',
    objetivo:'', rotina_trabalho:'', horario_acordar:'', tempo_cozinhar:'', rotina_detalhe:'',
    num_refeicoes:'', restricoes:[], nao_gosta:'', mais_gosta:'', alimentacao_atual:'',
    pratica_exercicio:'', academia:'', tempo_treino:'', atividades_gosta:'',
    condicao_saude:[], sono:'', estresse:'', medicamentos:'',
    dificuldades:[], tentativas:'', obstaculo:'',
    personalidade:[], meta_especifica:'', info_extra:'', email:''
  });

  const TOTAL = 7;
  const pct = (step / TOTAL) * 100;

  function set(k, v){ setDados(d => ({...d, [k]:v})); }

  function toggleArr(k, v){
    setDados(d => {
      const arr = d[k] || [];
      return {...d, [k]: arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]};
    });
  }

  function Op({k, v, label, sub, multi}){
    const sel = multi ? (dados[k]||[]).includes(v) : dados[k]===v;
    return (
      <div style={s.op(sel)} onClick={()=> multi ? toggleArr(k,v) : set(k,v)}>
        <div style={s.opCheck(sel)}>{sel?'✓':''}</div>
        <div><strong style={s.opStrong}>{label}</strong>{sub&&<span style={s.opSpan}>{sub}</span>}</div>
      </div>
    );
  }

  function validate(){
    if(step===0){
      if(!dados.nome.trim()){alert('Informe seu nome.');return false;}
      if(!dados.idade){alert('Informe sua idade.');return false;}
      if(!dados.sexo){alert('Selecione seu sexo.');return false;}
      if(!dados.peso){alert('Informe seu peso.');return false;}
      if(!dados.altura){alert('Informe sua altura.');return false;}
      if(!dados.objetivo){alert('Selecione seu objetivo.');return false;}
    }
    if(step===1 && !dados.rotina_trabalho){alert('Selecione sua rotina de trabalho.');return false;}
    if(step===2 && !dados.num_refeicoes){alert('Selecione quantas refeições faz.');return false;}
    if(step===3){
      if(!dados.pratica_exercicio){alert('Selecione seu nível de atividade.');return false;}
      if(!dados.academia){alert('Selecione sua preferência de treino.');return false;}
    }
    if(step===6 && !dados.email){alert('Informe seu e-mail.');return false;}
    return true;
  }

  function next(){ if(validate()){ setStep(s=>Math.min(s+1,TOTAL-1)); window.scrollTo({top:0,behavior:'smooth'}); } }
  function prev(){ setStep(s=>Math.max(s-1,0)); window.scrollTo({top:0,behavior:'smooth'}); }

  async function gerar(){
    if(!validate()) return;
    setLoading(true);
    const peso = parseFloat(dados.peso);
    const altura = parseFloat(dados.altura);
    const imc = peso && altura ? (peso/Math.pow(altura/100,2)).toFixed(1) : 'não calculado';

    const prompt = `Você é um nutricionista altamente experiente, com mais de 15 anos de atuação clínica.

DADOS DO PACIENTE:
- Nome: ${dados.nome}
- Idade: ${dados.idade} anos | Sexo: ${dados.sexo}
- Peso: ${dados.peso}kg | Altura: ${dados.altura}cm | IMC: ${imc}
- Objetivo: ${dados.objetivo}
- Rotina de trabalho: ${dados.rotina_trabalho}
- Horário que acorda: ${dados.horario_acordar}
- Tempo para cozinhar: ${dados.tempo_cozinhar}
- Rotina detalhada: ${dados.rotina_detalhe || 'não informado'}
- Refeições por dia: ${dados.num_refeicoes}
- Restrições alimentares: ${dados.restricoes.join(', ') || 'nenhuma'}
- Não gosta de: ${dados.nao_gosta || 'não informado'}
- Gosta de: ${dados.mais_gosta || 'não informado'}
- Alimentação atual: ${dados.alimentacao_atual || 'não informado'}
- Nível de atividade: ${dados.pratica_exercicio}
- Academia/treino: ${dados.academia}
- Tempo disponível para treino: ${dados.tempo_treino || 'não informado'}
- Atividades de interesse: ${dados.atividades_gosta || 'não informado'}
- Condições de saúde: ${dados.condicao_saude.join(', ') || 'nenhuma'}
- Qualidade do sono: ${dados.sono || 'não informado'}
- Nível de estresse: ${dados.estresse || 'não informado'}
- Medicamentos/suplementos: ${dados.medicamentos || 'nenhum'}
- Dificuldades: ${dados.dificuldades.join(', ') || 'nenhuma informada'}
- Tentativas anteriores: ${dados.tentativas || 'não informado'}
- Principal obstáculo: ${dados.obstaculo || 'não informado'}
- Personalidade: ${dados.personalidade.join(', ') || 'não informado'}
- Meta específica: ${dados.meta_especifica || 'não informada'}
- Informações extras: ${dados.info_extra || 'nenhuma'}

Crie um GUIA NUTRICIONAL E DE TREINO COMPLETO E TOTALMENTE PERSONALIZADO para ${dados.nome}. Em português brasileiro, profissional, humanizado e baseado em evidências.

ESTRUTURA OBRIGATÓRIA:

# GUIA NUTRICIONAL PERSONALIZADO
## ${dados.nome} | ${dados.objetivo}

---

## 1. ANÁLISE DO SEU PERFIL
[Análise completa, IMC com classificação, pontos positivos e de atenção]

## 2. SEUS NÚMEROS PERSONALIZADOS
- IMC: ${imc} [classificação]
- Taxa Metabólica Basal (TMB) calculada
- Gasto Calórico Total (GET)
- Meta calórica para o objetivo
- Distribuição de macronutrientes em gramas e %

## 3. ESTRATÉGIA NUTRICIONAL
[Estratégia definida e justificativa baseada no perfil]

## 4. PLANO ALIMENTAR COMPLETO
[Cada refeição com: sugestão + substituições + quantidades em medidas caseiras + calorias de cada alimento]

## 5. PLANEJAMENTO SEMANAL
[Segunda a domingo com variações]

## 6. LISTA DE COMPRAS
[Por categoria: proteínas, carboidratos, gorduras, verduras, itens práticos]

## 7. SUPLEMENTOS E VITAMINAS RECOMENDADOS
[Baseado no perfil e objetivo. Dosagem e motivo. Mencione vitaminas deficientes no perfil.]

## 8. ORIENTAÇÕES COMPORTAMENTAIS
[Para as dificuldades específicas informadas]

## 9. TREINO PERSONALIZADO
[Se academia: treino completo com exercícios, séries, repetições, descanso]
[Se casa/sem academia: treino com peso corporal + esportes recomendados para o perfil]

## 10. ESTILO DE VIDA
[Sono, estresse e hábitos que impactam os resultados]

## 11. RESUMO RÁPIDO
[Versão condensada para consulta diária]

## 12. MENSAGEM FINAL
[8 a 15 linhas, texto corrido, acolhedor, profissional, motivador — como nutricionista experiente encerrando o atendimento]`;

    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({prompt, nome: dados.nome})
      });
      const result = await res.json();
      if(result.content){
        setGuia(result.content);
        setLoading(false);
        setDone(true);
      } else {
        throw new Error(result.error || 'Sem conteúdo');
      }
    } catch(e) {
      setLoading(false);
      alert('Erro ao gerar seu guia: ' + e.message + '. Tente novamente.');
    }
  }

  function abrirPDF(){
    const html = guia
      .replace(/^# (.*$)/gm,'<h1>$1</h1>')
      .replace(/^## (.*$)/gm,'<h2>$1</h2>')
      .replace(/^### (.*$)/gm,'<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.*?)\*/g,'<em>$1</em>')
      .replace(/^- (.*$)/gm,'<li>$1</li>')
      .replace(/^---$/gm,'<hr>')
      .replace(/\n/g,'<br>');

    const full = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Guia Nutricional - ${dados.nome}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial,sans-serif;background:#0a1f0e;color:#f5f0e0;padding:36px;font-size:13px;line-height:1.8;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
h1{font-size:28px;font-weight:700;color:#f5f0e0;margin:32px 0 8px;border-bottom:2px solid #e8934a;padding-bottom:8px;}
h2{font-size:20px;font-weight:700;color:#fac070;margin:24px 0 8px;}
h3{font-size:13px;font-weight:600;color:#8fcf9a;margin:16px 0 5px;text-transform:uppercase;}
strong{color:#f5f0e0;font-weight:600;}em{font-style:italic;color:#f0a85a;}
li{margin-left:20px;margin-bottom:4px;}
hr{border:none;border-top:1px solid rgba(232,147,74,0.2);margin:20px 0;}
.topo{background:#1a4a20;border:1px solid rgba(232,147,74,0.25);padding:24px;margin-bottom:28px;text-align:center;}
.topo h1{border:none;font-size:34px;margin:0 0 6px;}
.topo p{font-size:11px;color:rgba(245,240,224,0.4);}
.btn{position:fixed;top:12px;right:12px;background:#e8934a;color:#0a1f0e;border:none;font-weight:700;font-size:13px;padding:10px 20px;cursor:pointer;}
@media print{.btn{display:none;}}
</style></head><body>
<button class="btn" onclick="window.print()">Salvar como PDF</button>
<div class="topo"><h1>Guia Nutricional Personalizado</h1><p>Seu Nutricionista · Exclusivo para ${dados.nome}</p></div>
${html}</body></html>`;

    const blob = new Blob([full], {type:'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  if(loading) return (
    <div style={{...s.body, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Jost:wght@300;400&display=swap"/>
      <div style={s.loadWrap}>
        <div style={s.spinner}/>
        <p style={s.loadH}>Criando seu guia personalizado...</p>
        <p style={s.loadSub}>Analisando suas informações e montando<br/>um plano exclusivo para você.<br/><br/>Isso pode levar alguns instantes.</p>
      </div>
    </div>
  );

  if(done) return (
    <div style={{...s.body, display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Jost:wght@300;400;700&display=swap"/>
      <div style={{maxWidth:520, width:'100%', textAlign:'center', padding:'0 24px'}}>
        <div style={{fontSize:52, marginBottom:16}}>🎉</div>
        <h2 style={s.resH}>Seu guia está <em style={s.resHem}>pronto!</em></h2>
        <p style={s.resSub}>Seu guia nutricional e de treino 100% personalizado foi gerado com sucesso. Clique abaixo para acessar seu PDF exclusivo.</p>
        <button style={s.btnDl} onClick={abrirPDF}>⬇️ Baixar meu guia em PDF</button>
        <p style={{marginTop:14, fontSize:11, color:'rgba(245,240,224,0.2)', letterSpacing:1}}>Acesso vitalício · Exclusivo para você</p>
      </div>
    </div>
  );

  return (
    <div style={s.body}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,700&family=Jost:wght@300;400;500;600;700&display=swap"/>
      <nav style={s.nav}>
        <div style={s.logo}>Seu <span style={s.logoSpan}>Nutricionista</span></div>
        <span style={{fontSize:11, letterSpacing:2, color:'rgba(245,240,224,0.3)', textTransform:'uppercase'}}>Passo {step+1} de {TOTAL}</span>
      </nav>
      <div style={s.progressWrap}><div style={s.progressBar(pct)}/></div>

      <div style={s.hero}>
        <div style={s.badge}>✦ Guia Personalizado</div>
        <h1 style={s.h1}>Vamos conhecer<br/><em style={s.h1em}>você de verdade.</em></h1>
        <p style={s.heroSub}>Quanto mais detalhes você compartilhar, mais personalizado será seu guia.</p>
      </div>

      <div style={s.stepsNav}>
        {[1,2,3,4,5,6,7].map((n,i)=>(
          <div key={i} style={s.dot(i===step, i<step)}>{n}</div>
        ))}
      </div>

      <div style={s.container}>

        {/* STEP 1 */}
        {step===0 && <>
          <span style={s.stepNum}>01 / 07</span>
          <h2 style={s.stepH2}>Dados <em style={{fontStyle:'italic',color:LARANJA2}}>pessoais</em></h2>
          <p style={s.stepSub}>Informações básicas para personalizar seu plano.</p>

          <div style={s.campo}><label style={s.label}>Nome completo *</label>
            <input style={s.input} value={dados.nome} onChange={e=>set('nome',e.target.value)} placeholder="Seu nome completo"/></div>

          <div style={s.grid2}>
            <div style={s.campo}><label style={s.label}>Idade *</label>
              <input style={s.input} type="number" value={dados.idade} onChange={e=>set('idade',e.target.value)} placeholder="Ex: 28"/></div>
            <div style={s.campo}><label style={s.label}>Sexo *</label>
              <select style={s.select} value={dados.sexo} onChange={e=>set('sexo',e.target.value)}>
                <option value="">Selecione</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="prefiro não informar">Prefiro não informar</option>
              </select></div>
          </div>

          <div style={s.grid2}>
            <div style={s.campo}><label style={s.label}>Peso (kg) *</label>
              <input style={s.input} type="number" value={dados.peso} onChange={e=>set('peso',e.target.value)} placeholder="Ex: 68"/></div>
            <div style={s.campo}><label style={s.label}>Altura (cm) *</label>
              <input style={s.input} type="number" value={dados.altura} onChange={e=>set('altura',e.target.value)} placeholder="Ex: 165"/></div>
          </div>

          <div style={s.campo}><label style={s.label}>Objetivo principal *</label>
            {[['emagrecer','Emagrecer','Reduzir gordura corporal'],['ganhar massa','Ganhar massa muscular','Aumentar músculo e força'],['saude geral','Melhorar a saúde geral','Mais energia e bem-estar'],['definicao','Definição muscular','Manter massa e reduzir gordura'],['performance','Melhorar performance','Mais energia e resistência']].map(([v,l,sub])=>(
              <Op key={v} k="objetivo" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.btnNav}>
            <div/>
            <button style={s.btnNext} onClick={next}>Continuar →</button>
          </div>
        </>}

        {/* STEP 2 */}
        {step===1 && <>
          <span style={s.stepNum}>02 / 07</span>
          <h2 style={s.stepH2}>Sua <em style={{fontStyle:'italic',color:LARANJA2}}>rotina diária</em></h2>
          <p style={s.stepSub}>Entender sua rotina é essencial para criar um plano que você vai conseguir seguir.</p>

          <div style={s.campo}><label style={s.label}>Rotina de trabalho *</label>
            {[['sedentario escritorio','Trabalho sentado / escritório','Pouco movimento durante o dia'],['trabalho em pe','Trabalho em pé ou em movimento','Bastante atividade física no trabalho'],['trabalho pesado','Trabalho físico pesado','Esforço físico intenso diariamente'],['home office','Home office','Mais flexibilidade de horários'],['estudante','Estudante','Rotina de estudos']].map(([v,l,sub])=>(
              <Op key={v} k="rotina_trabalho" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Horário que acorda</label>
            <select style={s.select} value={dados.horario_acordar} onChange={e=>set('horario_acordar',e.target.value)}>
              <option value="">Selecione</option>
              <option value="antes das 5h">Antes das 5h</option>
              <option value="entre 5h e 7h">Entre 5h e 7h</option>
              <option value="entre 7h e 9h">Entre 7h e 9h</option>
              <option value="depois das 9h">Depois das 9h</option>
              <option value="horário variado">Horário variado / plantão</option>
            </select></div>

          <div style={s.campo}><label style={s.label}>Tempo para preparar refeições *</label>
            {[['sim tenho tempo','Sim, gosto de cozinhar','Tenho tempo e disposição'],['pouco tempo','Tenho pouco tempo','Preciso de refeições rápidas'],['nao cozinho','Raramente cozinho','Como fora ou peço delivery']].map(([v,l,sub])=>(
              <Op key={v} k="tempo_cozinhar" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Detalhe sua rotina diária <span style={{fontWeight:300,color:'rgba(245,240,224,0.3)'}}>(opcional mas importante)</span></label>
            <textarea style={s.textarea} value={dados.rotina_detalhe} onChange={e=>set('rotina_detalhe',e.target.value)} placeholder="Ex: acordo às 6h, trabalho das 8h às 18h..."/></div>

          <div style={s.btnNav}>
            <button style={s.btnPrev} onClick={prev}>← Voltar</button>
            <button style={s.btnNext} onClick={next}>Continuar →</button>
          </div>
        </>}

        {/* STEP 3 */}
        {step===2 && <>
          <span style={s.stepNum}>03 / 07</span>
          <h2 style={s.stepH2}>Hábitos <em style={{fontStyle:'italic',color:LARANJA2}}>alimentares</em></h2>
          <p style={s.stepSub}>Vamos entender como você come hoje para criar o melhor plano alimentar.</p>

          <div style={s.campo}><label style={s.label}>Refeições por dia *</label>
            {[['2 refeicoes','2 refeições'],['3 refeicoes','3 refeições'],['4 refeicoes','4 refeições'],['5 ou mais','5 ou mais']].map(([v,l])=>(
              <Op key={v} k="num_refeicoes" v={v} label={l}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Restrições alimentares *</label>
            {[['nenhuma','Nenhuma restrição','Como de tudo normalmente'],['vegetariano','Vegetariano','Não como carne'],['vegano','Vegano','Não como produto animal'],['intolerante a lactose','Intolerante à lactose'],['intolerante ao gluten','Intolerante ao glúten'],['alergia a frutos do mar','Alergia a frutos do mar']].map(([v,l,sub])=>(
              <Op key={v} k="restricoes" v={v} label={l} sub={sub} multi/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Alimentos que NÃO gosta</label>
            <textarea style={s.textarea} value={dados.nao_gosta} onChange={e=>set('nao_gosta',e.target.value)} placeholder="Ex: não gosto de brócolis, fígado..."/></div>

          <div style={s.campo}><label style={s.label}>Alimentos que MAIS gosta</label>
            <textarea style={s.textarea} value={dados.mais_gosta} onChange={e=>set('mais_gosta',e.target.value)} placeholder="Ex: adoro frango, arroz, banana..."/></div>

          <div style={s.campo}><label style={s.label}>Como é sua alimentação hoje</label>
            <textarea style={s.textarea} value={dados.alimentacao_atual} onChange={e=>set('alimentacao_atual',e.target.value)} placeholder="Ex: pulo o café, almoço no trabalho..."/></div>

          <div style={s.btnNav}>
            <button style={s.btnPrev} onClick={prev}>← Voltar</button>
            <button style={s.btnNext} onClick={next}>Continuar →</button>
          </div>
        </>}

        {/* STEP 4 */}
        {step===3 && <>
          <span style={s.stepNum}>04 / 07</span>
          <h2 style={s.stepH2}>Atividade <em style={{fontStyle:'italic',color:LARANJA2}}>física</em></h2>
          <p style={s.stepSub}>Vamos entender seu nível atual e montar o treino ideal para você.</p>

          <div style={s.campo}><label style={s.label}>Pratica exercícios atualmente? *</label>
            {[['nao pratico','Não pratico exercícios','Sedentário no momento'],['raramente','Raramente','1 vez por semana ou menos'],['moderado 2 3x semana','Moderado','2 a 3 vezes por semana'],['frequente 4 5x semana','Frequente','4 a 5 vezes por semana'],['diario','Diário','Todos os dias']].map(([v,l,sub])=>(
              <Op key={v} k="pratica_exercicio" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Academia ou treino em casa? *</label>
            {[['sim academia','Sim, tenho academia','Tenho acesso e disposição'],['quero comecar academia','Quero começar na academia','Ainda não tenho mas quero'],['prefiro em casa','Prefiro treinar em casa','Sem academia'],['sem condicoes academia','Sem condições no momento','Preciso de treino sem equipamentos']].map(([v,l,sub])=>(
              <Op key={v} k="academia" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Tempo disponível para treinar</label>
            {[['ate 30 minutos','Até 30 minutos'],['30 a 60 minutos','30 a 60 minutos'],['1 a 2 horas','1 a 2 horas'],['mais de 2 horas','Mais de 2 horas']].map(([v,l])=>(
              <Op key={v} k="tempo_treino" v={v} label={l}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Atividades que gosta ou tem interesse</label>
            <textarea style={s.textarea} value={dados.atividades_gosta} onChange={e=>set('atividades_gosta',e.target.value)} placeholder="Ex: gosto de caminhar, quero natação..."/></div>

          <div style={s.btnNav}>
            <button style={s.btnPrev} onClick={prev}>← Voltar</button>
            <button style={s.btnNext} onClick={next}>Continuar →</button>
          </div>
        </>}

        {/* STEP 5 */}
        {step===4 && <>
          <span style={s.stepNum}>05 / 07</span>
          <h2 style={s.stepH2}>Saúde e <em style={{fontStyle:'italic',color:LARANJA2}}>bem-estar</em></h2>
          <p style={s.stepSub}>Informações que impactam diretamente seu plano.</p>

          <div style={s.campo}><label style={s.label}>Condição de saúde diagnosticada</label>
            {[['nenhuma','Nenhuma','Sou saudável'],['diabetes','Diabetes ou pré-diabetes'],['hipertensao','Hipertensão'],['colesterol alto','Colesterol alto'],['hipotireoidismo','Hipotireoidismo'],['sop','SOP (Síndrome do Ovário Policístico)'],['outra','Outra condição']].map(([v,l,sub])=>(
              <Op key={v} k="condicao_saude" v={v} label={l} sub={sub} multi/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Qualidade do sono</label>
            {[['ruim menos de 6h','Ruim','Menos de 6h ou interrompido'],['regular 6 a 7h','Regular','6 a 7h'],['bom 7 a 8h','Bom','7 a 8h e acordo descansado'],['otimo mais de 8h','Ótimo','Mais de 8h']].map(([v,l,sub])=>(
              <Op key={v} k="sono" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Nível de estresse</label>
            {[['baixo','Baixo','Vida tranquila'],['moderado','Moderado','Consigo gerenciar'],['alto','Alto','Muito estressado']].map(([v,l,sub])=>(
              <Op key={v} k="estresse" v={v} label={l} sub={sub}/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Medicamentos ou suplementos que usa</label>
            <textarea style={s.textarea} value={dados.medicamentos} onChange={e=>set('medicamentos',e.target.value)} placeholder="Ex: anticoncepcional, vitamina D..."/></div>

          <div style={s.btnNav}>
            <button style={s.btnPrev} onClick={prev}>← Voltar</button>
            <button style={s.btnNext} onClick={next}>Continuar →</button>
          </div>
        </>}

        {/* STEP 6 */}
        {step===5 && <>
          <span style={s.stepNum}>06 / 07</span>
          <h2 style={s.stepH2}>Suas <em style={{fontStyle:'italic',color:LARANJA2}}>dificuldades</em></h2>
          <p style={s.stepSub}>Entender o que já não funcionou é tão importante quanto saber o que você quer.</p>

          <div style={s.campo}><label style={s.label}>Maiores dificuldades com alimentação *</label>
            {[['compulsao','Compulsão alimentar','Como muito em certos momentos'],['falta de tempo','Falta de tempo','Não consigo preparar comida saudável'],['comer fora','Como muito fora de casa'],['doce e processados','Vício em doce / ultraprocessados'],['consistencia','Falta de consistência','Começo bem mas não mantenho'],['ansiedade','Como por ansiedade / emoção']].map(([v,l,sub])=>(
              <Op key={v} k="dificuldades" v={v} label={l} sub={sub} multi/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Tentativas anteriores de dieta</label>
            <textarea style={s.textarea} value={dados.tentativas} onChange={e=>set('tentativas',e.target.value)} placeholder="Ex: tentei low carb, jejum, funcionou por X dias..."/></div>

          <div style={s.campo}><label style={s.label}>Maior obstáculo para seu objetivo</label>
            <textarea style={s.textarea} value={dados.obstaculo} onChange={e=>set('obstaculo',e.target.value)} placeholder="Ex: rotina agitada, falta de motivação..."/></div>

          <div style={s.btnNav}>
            <button style={s.btnPrev} onClick={prev}>← Voltar</button>
            <button style={s.btnNext} onClick={next}>Continuar →</button>
          </div>
        </>}

        {/* STEP 7 */}
        {step===6 && <>
          <span style={s.stepNum}>07 / 07</span>
          <h2 style={s.stepH2}>Sobre <em style={{fontStyle:'italic',color:LARANJA2}}>você</em></h2>
          <p style={s.stepSub}>Últimas informações para tornar seu guia ainda mais personalizado.</p>

          <div style={s.campo}><label style={s.label}>Como você se descreveria</label>
            {[['disciplinado','Disciplinado quando tenho um plano claro'],['precisa motivacao','Preciso de motivação constante'],['gosto variedade','Gosto de variedade nas refeições'],['prefiro rotina','Prefiro rotina fixa e repetitiva'],['vida social ativa','Tenho vida social ativa (come fora com frequência)']].map(([v,l])=>(
              <Op key={v} k="personalidade" v={v} label={l} multi/>
            ))}</div>

          <div style={s.campo}><label style={s.label}>Meta específica de peso ou resultado</label>
            <input style={s.input} value={dados.meta_especifica} onChange={e=>set('meta_especifica',e.target.value)} placeholder="Ex: quero chegar a 60kg em 3 meses..."/></div>

          <div style={s.campo}>
            <label style={s.label}>Algo mais que queira nos contar? <span style={{fontWeight:300,color:'rgba(245,240,224,0.3)'}}>— muito importante!</span></label>
            <textarea style={{...s.textarea,minHeight:120}} value={dados.info_extra} onChange={e=>set('info_extra',e.target.value)} placeholder="Qualquer informação adicional sobre saúde, rotina, objetivos ou limitações..."/>
            <p style={{fontSize:11,color:'rgba(245,240,224,0.3)',marginTop:5}}>Este campo é o mais importante! Quanto mais você contar, melhor será seu guia.</p>
          </div>

          <div style={s.campo}><label style={s.label}>Seu e-mail *</label>
            <input style={s.input} type="email" value={dados.email} onChange={e=>set('email',e.target.value)} placeholder="seuemail@exemplo.com"/></div>

          <div style={s.btnNav}>
            <button style={s.btnPrev} onClick={prev}>← Voltar</button>
            <button style={{...s.btnNext, fontSize:13, letterSpacing:1, padding:'14px 24px'}} onClick={gerar}>🥗 Gerar meu guia personalizado</button>
          </div>
        </>}

      </div>
    </div>
  );
}
