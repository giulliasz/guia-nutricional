export default function Questionario() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Questionário — Seu Guia Nutricional Personalizado</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --v1:#0a1f0e;--v2:#0d2810;--v3:#1a4a20;--v4:#2d6a35;
  --creme:#f5f0e0;--laranja:#e8934a;--laranja2:#f0a85a;--laranja3:#fac070;
  --claro:#8fcf9a;--bl:rgba(232,147,74,0.25);--bv:rgba(143,207,154,0.13);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--v1);color:var(--creme);font-family:'Jost',sans-serif;min-height:100vh;padding:0 0 60px;}

body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 120% 60% at 50% 0%,#1a4a20 0%,transparent 50%);pointer-events:none;z-index:0;}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(10,31,14,0.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(143,207,154,0.07);padding:14px 32px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;font-weight:600;color:var(--creme);}
.nav-logo span{color:var(--laranja2);}
.nav-step{font-size:11px;letter-spacing:2px;color:rgba(245,240,224,0.3);text-transform:uppercase;}

/* PROGRESS */
.progress-wrap{background:rgba(255,255,255,0.04);height:3px;position:relative;}
.progress-bar{height:3px;background:linear-gradient(90deg,var(--v3),var(--laranja));transition:width 0.5s ease;width:0%;}

/* HERO DO FORM */
.form-hero{text-align:center;padding:60px 24px 40px;position:relative;z-index:1;}
.form-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--bl);color:var(--laranja3);font-size:10px;letter-spacing:4px;text-transform:uppercase;padding:7px 20px;margin-bottom:24px;}
.form-hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,5vw,52px);font-weight:700;line-height:1.05;margin-bottom:12px;}
.form-hero h1 em{font-style:italic;color:var(--laranja2);}
.form-hero p{font-size:14px;font-weight:300;color:rgba(245,240,224,0.55);max-width:480px;margin:0 auto;line-height:1.8;}

/* STEPS */
.steps-nav{display:flex;justify-content:center;gap:8px;padding:0 24px 32px;flex-wrap:wrap;position:relative;z-index:1;}
.step-dot{width:32px;height:32px;border-radius:50%;border:1px solid rgba(245,240,224,0.1);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:rgba(245,240,224,0.25);cursor:pointer;transition:all 0.3s;}
.step-dot.active{border-color:var(--laranja);color:var(--laranja);background:rgba(232,147,74,0.1);}
.step-dot.done{border-color:var(--claro);color:var(--v1);background:var(--claro);}

/* FORM CONTAINER */
.form-container{max-width:680px;margin:0 auto;padding:0 24px;position:relative;z-index:1;}

/* STEP */
.step{display:none;}
.step.active{display:block;animation:fadeUp 0.4s ease both;}

.step-header{margin-bottom:32px;}
.step-num{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--laranja);margin-bottom:8px;display:block;}
.step-header h2{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,3.5vw,34px);font-weight:700;line-height:1.1;margin-bottom:8px;}
.step-header h2 em{font-style:italic;color:var(--laranja2);}
.step-header p{font-size:13px;font-weight:300;color:rgba(245,240,224,0.45);line-height:1.7;}

/* CAMPO */
.campo{margin-bottom:24px;}
.campo label{display:block;font-size:13px;font-weight:600;color:var(--creme);margin-bottom:8px;letter-spacing:0.3px;}
.campo label .obrig{color:var(--laranja);margin-left:2px;}
.campo small{display:block;font-size:11px;font-weight:300;color:rgba(245,240,224,0.35);margin-top:5px;line-height:1.6;}

input[type=text],input[type=number],input[type=email],select,textarea{
  width:100%;background:rgba(255,255,255,0.04);
  border:1px solid rgba(245,240,224,0.1);
  color:var(--creme);font-family:'Jost',sans-serif;font-size:14px;font-weight:300;
  padding:14px 16px;outline:none;transition:border-color 0.2s;
  -webkit-appearance:none;border-radius:0;
}
input[type=text]:focus,input[type=number]:focus,input[type=email]:focus,select:focus,textarea:focus{border-color:rgba(232,147,74,0.4);background:rgba(255,255,255,0.06);}
input::placeholder,textarea::placeholder{color:rgba(245,240,224,0.2);}
select option{background:#0d2810;color:var(--creme);}
textarea{resize:vertical;min-height:100px;line-height:1.6;}

/* GRID 2 COL */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media(max-width:520px){.grid2{grid-template-columns:1fr;}}

/* RADIO/CHECKBOX CUSTOM */
.opcoes{display:flex;flex-direction:column;gap:8px;}
.opcoes.horizontal{flex-direction:row;flex-wrap:wrap;}
.op{
  display:flex;align-items:flex-start;gap:12px;
  background:rgba(255,255,255,0.03);border:1px solid rgba(245,240,224,0.08);
  padding:14px 16px;cursor:pointer;transition:all 0.2s;
}
.op:hover{background:rgba(255,255,255,0.06);border-color:rgba(232,147,74,0.2);}
.op.selected{background:rgba(232,147,74,0.08);border-color:var(--bl);}
.op input{display:none;}
.op-check{
  width:20px;height:20px;border:1px solid rgba(245,240,224,0.2);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;margin-top:1px;transition:all 0.2s;font-size:11px;
}
.op.selected .op-check{border-color:var(--laranja);background:var(--laranja);color:var(--v1);}
.op-txt{flex:1;}
.op-txt strong{display:block;font-size:13px;font-weight:600;color:var(--creme);margin-bottom:2px;}
.op-txt span{font-size:12px;font-weight:300;color:rgba(245,240,224,0.4);line-height:1.5;}

/* RANGE */
.range-wrap{position:relative;}
input[type=range]{
  width:100%;-webkit-appearance:none;appearance:none;
  height:3px;background:rgba(255,255,255,0.1);outline:none;cursor:pointer;
}
input[type=range]::-webkit-slider-thumb{
  -webkit-appearance:none;width:20px;height:20px;border-radius:50%;
  background:var(--laranja);cursor:pointer;border:2px solid var(--v1);
}
.range-labels{display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:rgba(245,240,224,0.3);}
.range-val{text-align:center;font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--laranja2);margin-bottom:8px;}

/* BOTÕES */
.btn-nav{display:flex;gap:12px;margin-top:36px;justify-content:space-between;}
.btn-prev{
  background:transparent;border:1px solid rgba(245,240,224,0.1);
  color:rgba(245,240,224,0.4);font-family:'Jost',sans-serif;font-size:13px;
  font-weight:500;letter-spacing:1px;padding:14px 28px;cursor:pointer;
  transition:all 0.2s;
}
.btn-prev:hover{border-color:rgba(245,240,224,0.2);color:rgba(245,240,224,0.6);}
.btn-next{
  background:var(--laranja);color:var(--v1);border:none;
  font-family:'Jost',sans-serif;font-size:13px;font-weight:700;
  letter-spacing:2px;text-transform:uppercase;padding:14px 36px;
  cursor:pointer;transition:all 0.2s;flex:1;
}
.btn-next:hover{background:var(--laranja2);transform:translateY(-1px);}
.btn-next:disabled{background:#333;cursor:not-allowed;opacity:0.5;transform:none;}

/* LOADING */
.loading-screen{
  display:none;text-align:center;padding:80px 24px;
}
.loading-screen.show{display:block;}
.loading-spinner{
  width:60px;height:60px;border:2px solid rgba(232,147,74,0.2);
  border-top-color:var(--laranja);border-radius:50%;
  animation:spin 1s linear infinite;margin:0 auto 24px;
}
.loading-txt{font-family:'Cormorant Garamond',serif;font-size:clamp(20px,3vw,28px);font-style:italic;color:var(--creme);margin-bottom:8px;}
.loading-sub{font-size:13px;font-weight:300;color:rgba(245,240,224,0.4);line-height:1.8;}
.loading-steps{margin-top:32px;display:flex;flex-direction:column;gap:8px;max-width:360px;margin-left:auto;margin-right:auto;}
.lstep{display:flex;align-items:center;gap:12px;font-size:12px;color:rgba(245,240,224,0.3);padding:8px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);}
.lstep.done{color:var(--claro);border-color:rgba(143,207,154,0.15);}
.lstep.active{color:var(--laranja3);border-color:var(--bl);}
.lstep-icon{font-size:14px;width:20px;text-align:center;}

/* RESULTADO */
.resultado-screen{display:none;text-align:center;padding:60px 24px;}
.resultado-screen.show{display:block;animation:fadeUp 0.6s ease both;}
.resultado-icon{font-size:56px;margin-bottom:16px;}
.resultado-h{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,5vw,46px);font-weight:700;color:var(--creme);margin-bottom:10px;}
.resultado-h em{font-style:italic;color:var(--laranja2);}
.resultado-sub{font-size:14px;font-weight:300;color:rgba(245,240,224,0.55);max-width:480px;margin:0 auto 36px;line-height:1.8;}
.btn-download-pdf{
  display:inline-flex;align-items:center;gap:12px;
  background:var(--laranja);color:var(--v1);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:700;font-size:14px;
  letter-spacing:2px;text-transform:uppercase;padding:18px 48px;
  transition:all 0.2s;cursor:pointer;border:none;
}
.btn-download-pdf:hover{background:var(--laranja2);transform:translateY(-2px);box-shadow:0 16px 40px rgba(232,147,74,0.35);}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}

/* DIVISOR */
.div-line{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(232,147,74,0.2),transparent);margin:28px 0;}
</style>
</head>
<body>

<nav>
  <div class="nav-logo">Seu <span>Nutricionista</span></div>
  <span class="nav-step" id="navStep">Passo 1 de 7</span>
</nav>
<div class="progress-wrap"><div class="progress-bar" id="progressBar"></div></div>

<div class="form-hero">
  <div class="form-badge">✦ Guia Personalizado</div>
  <h1>Vamos conhecer<br><em>você de verdade.</em></h1>
  <p>Quanto mais detalhes você compartilhar, mais preciso e personalizado será o seu guia nutricional e de treino.</p>
</div>

<div class="steps-nav" id="stepsNav">
  <div class="step-dot active" data-step="0">1</div>
  <div class="step-dot" data-step="1">2</div>
  <div class="step-dot" data-step="2">3</div>
  <div class="step-dot" data-step="3">4</div>
  <div class="step-dot" data-step="4">5</div>
  <div class="step-dot" data-step="5">6</div>
  <div class="step-dot" data-step="6">7</div>
</div>

<div class="form-container">

  <!-- STEP 1: DADOS PESSOAIS -->
  <div class="step active" id="step-0">
    <div class="step-header">
      <span class="step-num">01 / 07</span>
      <h2>Dados <em>pessoais</em></h2>
      <p>Informações básicas para personalizar seu plano.</p>
    </div>

    <div class="campo">
      <label>Nome completo <span class="obrig">*</span></label>
      <input type="text" id="nome" placeholder="Seu nome completo">
    </div>

    <div class="grid2">
      <div class="campo">
        <label>Idade <span class="obrig">*</span></label>
        <input type="number" id="idade" placeholder="Ex: 28" min="14" max="80">
      </div>
      <div class="campo">
        <label>Sexo <span class="obrig">*</span></label>
        <select id="sexo">
          <option value="">Selecione</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="outro">Prefiro não informar</option>
        </select>
      </div>
    </div>

    <div class="grid2">
      <div class="campo">
        <label>Peso atual (kg) <span class="obrig">*</span></label>
        <input type="number" id="peso" placeholder="Ex: 68" min="30" max="250" step="0.1">
      </div>
      <div class="campo">
        <label>Altura (cm) <span class="obrig">*</span></label>
        <input type="number" id="altura" placeholder="Ex: 165" min="130" max="220">
      </div>
    </div>

    <div class="campo">
      <label>Qual é o seu principal objetivo? <span class="obrig">*</span></label>
      <div class="opcoes" id="objetivo">
        <label class="op"><input type="radio" name="objetivo" value="emagrecer"><div class="op-check">✓</div><div class="op-txt"><strong>Emagrecer</strong><span>Reduzir gordura corporal e melhorar composição</span></div></label>
        <label class="op"><input type="radio" name="objetivo" value="ganhar massa"><div class="op-check">✓</div><div class="op-txt"><strong>Ganhar massa muscular</strong><span>Aumentar músculo e força</span></div></label>
        <label class="op"><input type="radio" name="objetivo" value="saude geral"><div class="op-check">✓</div><div class="op-txt"><strong>Melhorar a saúde geral</strong><span>Mais energia, disposição e bem-estar</span></div></label>
        <label class="op"><input type="radio" name="objetivo" value="definicao"><div class="op-check">✓</div><div class="op-txt"><strong>Definição muscular</strong><span>Manter massa e reduzir gordura</span></div></label>
        <label class="op"><input type="radio" name="objetivo" value="performance"><div class="op-check">✓</div><div class="op-txt"><strong>Melhorar performance esportiva</strong><span>Mais energia e resistência</span></div></label>
      </div>
    </div>

    <div class="btn-nav">
      <div></div>
      <button class="btn-next" onclick="nextStep()">Continuar →</button>
    </div>
  </div>

  <!-- STEP 2: ROTINA -->
  <div class="step" id="step-1">
    <div class="step-header">
      <span class="step-num">02 / 07</span>
      <h2>Sua <em>rotina diária</em></h2>
      <p>Entender sua rotina é essencial para criar um plano que você vai conseguir seguir.</p>
    </div>

    <div class="campo">
      <label>Como é sua rotina de trabalho? <span class="obrig">*</span></label>
      <div class="opcoes" id="rotina_trabalho">
        <label class="op"><input type="radio" name="rotina_trabalho" value="sedentario escritorio"><div class="op-check">✓</div><div class="op-txt"><strong>Trabalho sentado / escritório</strong><span>Pouco movimento durante o dia</span></div></label>
        <label class="op"><input type="radio" name="rotina_trabalho" value="trabalho em pe"><div class="op-check">✓</div><div class="op-txt"><strong>Trabalho em pé ou em movimento</strong><span>Bastante atividade física no trabalho</span></div></label>
        <label class="op"><input type="radio" name="rotina_trabalho" value="trabalho pesado"><div class="op-check">✓</div><div class="op-txt"><strong>Trabalho físico pesado</strong><span>Esforço físico intenso diariamente</span></div></label>
        <label class="op"><input type="radio" name="rotina_trabalho" value="home office"><div class="op-check">✓</div><div class="op-txt"><strong>Home office / trabalho em casa</strong><span>Mais flexibilidade de horários</span></div></label>
        <label class="op"><input type="radio" name="rotina_trabalho" value="estudante"><div class="op-check">✓</div><div class="op-txt"><strong>Estudante</strong><span>Rotina de estudos</span></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Qual seu horário de acordar? <span class="obrig">*</span></label>
      <select id="horario_acordar">
        <option value="">Selecione</option>
        <option value="muito cedo antes das 5h">Muito cedo (antes das 5h)</option>
        <option value="cedo entre 5h e 7h">Cedo (5h às 7h)</option>
        <option value="manha entre 7h e 9h">Manhã (7h às 9h)</option>
        <option value="tarde depois das 9h">Tarde (depois das 9h)</option>
        <option value="horario variado">Horário variado / plantão</option>
      </select>
    </div>

    <div class="campo">
      <label>Tem tempo para preparar suas refeições? <span class="obrig">*</span></label>
      <div class="opcoes" id="tempo_cozinhar">
        <label class="op"><input type="radio" name="tempo_cozinhar" value="sim tenho tempo"><div class="op-check">✓</div><div class="op-txt"><strong>Sim, gosto de cozinhar</strong><span>Tenho tempo e disposição para preparar</span></div></label>
        <label class="op"><input type="radio" name="tempo_cozinhar" value="pouco tempo"><div class="op-check">✓</div><div class="op-txt"><strong>Tenho pouco tempo</strong><span>Preciso de refeições rápidas e práticas</span></div></label>
        <label class="op"><input type="radio" name="tempo_cozinhar" value="nao cozinho"><div class="op-check">✓</div><div class="op-txt"><strong>Raramente cozinho</strong><span>Como fora ou peço delivery com frequência</span></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Conte mais sobre sua rotina diária <span style="color:rgba(245,240,224,0.3);font-weight:300;">(opcional mas muito importante)</span></label>
      <textarea id="rotina_detalhe" placeholder="Ex: acordo às 6h, trabalho das 8h às 18h, tenho 1h de almoço, chego em casa às 19h..."></textarea>
      <small>Quanto mais detalhes, mais personalizado será seu plano!</small>
    </div>

    <div class="btn-nav">
      <button class="btn-prev" onclick="prevStep()">← Voltar</button>
      <button class="btn-next" onclick="nextStep()">Continuar →</button>
    </div>
  </div>

  <!-- STEP 3: ALIMENTAÇÃO -->
  <div class="step" id="step-2">
    <div class="step-header">
      <span class="step-num">03 / 07</span>
      <h2>Seus hábitos <em>alimentares</em></h2>
      <p>Vamos entender como você come hoje para criar o melhor plano alimentar para você.</p>
    </div>

    <div class="campo">
      <label>Quantas refeições você faz por dia? <span class="obrig">*</span></label>
      <div class="opcoes horizontal" id="num_refeicoes">
        <label class="op" style="flex:1;min-width:80px;justify-content:center;"><input type="radio" name="num_refeicoes" value="2 refeicoes"><div class="op-check">✓</div><div class="op-txt"><strong>2</strong></div></label>
        <label class="op" style="flex:1;min-width:80px;justify-content:center;"><input type="radio" name="num_refeicoes" value="3 refeicoes"><div class="op-check">✓</div><div class="op-txt"><strong>3</strong></div></label>
        <label class="op" style="flex:1;min-width:80px;justify-content:center;"><input type="radio" name="num_refeicoes" value="4 refeicoes"><div class="op-check">✓</div><div class="op-txt"><strong>4</strong></div></label>
        <label class="op" style="flex:1;min-width:80px;justify-content:center;"><input type="radio" name="num_refeicoes" value="5 ou mais refeicoes"><div class="op-check">✓</div><div class="op-txt"><strong>5+</strong></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Tem alguma restrição ou preferência alimentar? <span class="obrig">*</span></label>
      <div class="opcoes" id="restricoes">
        <label class="op"><input type="checkbox" name="restricoes" value="nenhuma restricao"><div class="op-check">✓</div><div class="op-txt"><strong>Nenhuma restrição</strong><span>Como de tudo normalmente</span></div></label>
        <label class="op"><input type="checkbox" name="restricoes" value="vegetariano"><div class="op-check">✓</div><div class="op-txt"><strong>Vegetariano</strong><span>Não como carne</span></div></label>
        <label class="op"><input type="checkbox" name="restricoes" value="vegano"><div class="op-check">✓</div><div class="op-txt"><strong>Vegano</strong><span>Não como nenhum produto animal</span></div></label>
        <label class="op"><input type="checkbox" name="restricoes" value="intolerante a lactose"><div class="op-check">✓</div><div class="op-txt"><strong>Intolerante à lactose</strong></div></label>
        <label class="op"><input type="checkbox" name="restricoes" value="intolerante ao gluten"><div class="op-check">✓</div><div class="op-txt"><strong>Intolerante ao glúten / Celíaco</strong></div></label>
        <label class="op"><input type="checkbox" name="restricoes" value="alergia a frutos do mar"><div class="op-check">✓</div><div class="op-txt"><strong>Alergia a frutos do mar</strong></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Quais alimentos você NÃO gosta ou não come?</label>
      <textarea id="nao_gosta" placeholder="Ex: não gosto de brócolis, fígado, peixe..."></textarea>
    </div>

    <div class="campo">
      <label>Quais alimentos você MAIS gosta?</label>
      <textarea id="mais_gosta" placeholder="Ex: adoro frango, arroz, banana, ovos..."></textarea>
    </div>

    <div class="campo">
      <label>Descreva como é sua alimentação hoje</label>
      <textarea id="alimentacao_atual" placeholder="Ex: café da manhã pulo, almoço no trabalho, jantar é o que tiver em casa..."></textarea>
      <small>Seja honesto! Isso nos ajuda a criar um plano realista para você.</small>
    </div>

    <div class="btn-nav">
      <button class="btn-prev" onclick="prevStep()">← Voltar</button>
      <button class="btn-next" onclick="nextStep()">Continuar →</button>
    </div>
  </div>

  <!-- STEP 4: ATIVIDADE FÍSICA -->
  <div class="step" id="step-3">
    <div class="step-header">
      <span class="step-num">04 / 07</span>
      <h2>Atividade <em>física</em></h2>
      <p>Vamos entender seu nível atual e montar o treino ideal para você.</p>
    </div>

    <div class="campo">
      <label>Você pratica exercícios atualmente? <span class="obrig">*</span></label>
      <div class="opcoes" id="pratica_exercicio">
        <label class="op"><input type="radio" name="pratica_exercicio" value="nao pratico"><div class="op-check">✓</div><div class="op-txt"><strong>Não pratico exercícios</strong><span>Sedentário no momento</span></div></label>
        <label class="op"><input type="radio" name="pratica_exercicio" value="raramente"><div class="op-check">✓</div><div class="op-txt"><strong>Raramente</strong><span>1 vez por semana ou menos</span></div></label>
        <label class="op"><input type="radio" name="pratica_exercicio" value="moderado 2 3x semana"><div class="op-check">✓</div><div class="op-txt"><strong>Moderado</strong><span>2 a 3 vezes por semana</span></div></label>
        <label class="op"><input type="radio" name="pratica_exercicio" value="frequente 4 5x semana"><div class="op-check">✓</div><div class="op-txt"><strong>Frequente</strong><span>4 a 5 vezes por semana</span></div></label>
        <label class="op"><input type="radio" name="pratica_exercicio" value="diario todos os dias"><div class="op-check">✓</div><div class="op-txt"><strong>Diário</strong><span>Todos os dias</span></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Você tem condições e disposição para ir à academia? <span class="obrig">*</span></label>
      <div class="opcoes" id="academia">
        <label class="op"><input type="radio" name="academia" value="sim academia"><div class="op-check">✓</div><div class="op-txt"><strong>Sim, tenho academia</strong><span>Tenho acesso e disposição para treinar na academia</span></div></label>
        <label class="op"><input type="radio" name="academia" value="quero comecar academia"><div class="op-check">✓</div><div class="op-txt"><strong>Quero começar na academia</strong><span>Ainda não tenho mas quero começar</span></div></label>
        <label class="op"><input type="radio" name="academia" value="prefiro em casa"><div class="op-check">✓</div><div class="op-txt"><strong>Prefiro treinar em casa</strong><span>Quero exercícios sem academia</span></div></label>
        <label class="op"><input type="radio" name="academia" value="sem condicoes academia"><div class="op-check">✓</div><div class="op-txt"><strong>Sem condições no momento</strong><span>Preciso de treino sem academia e sem equipamentos</span></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Quanto tempo você tem disponível para treinar por dia?</label>
      <div class="opcoes" id="tempo_treino">
        <label class="op"><input type="radio" name="tempo_treino" value="ate 30 minutos"><div class="op-check">✓</div><div class="op-txt"><strong>Até 30 minutos</strong></div></label>
        <label class="op"><input type="radio" name="tempo_treino" value="30 a 60 minutos"><div class="op-check">✓</div><div class="op-txt"><strong>30 a 60 minutos</strong></div></label>
        <label class="op"><input type="radio" name="tempo_treino" value="1 a 2 horas"><div class="op-check">✓</div><div class="op-txt"><strong>1 a 2 horas</strong></div></label>
        <label class="op"><input type="radio" name="tempo_treino" value="mais de 2 horas"><div class="op-check">✓</div><div class="op-txt"><strong>Mais de 2 horas</strong></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Quais atividades físicas você gosta ou tem interesse?</label>
      <textarea id="atividades_gosta" placeholder="Ex: gosto de caminhar, tenho interesse em natação, já pratiquei musculação..."></textarea>
    </div>

    <div class="btn-nav">
      <button class="btn-prev" onclick="prevStep()">← Voltar</button>
      <button class="btn-next" onclick="nextStep()">Continuar →</button>
    </div>
  </div>

  <!-- STEP 5: SAÚDE -->
  <div class="step" id="step-4">
    <div class="step-header">
      <span class="step-num">05 / 07</span>
      <h2>Saúde e <em>bem-estar</em></h2>
      <p>Informações de saúde que impactam diretamente seu plano.</p>
    </div>

    <div class="campo">
      <label>Tem alguma condição de saúde diagnosticada?</label>
      <div class="opcoes" id="condicao_saude">
        <label class="op"><input type="checkbox" name="condicao" value="nenhuma"><div class="op-check">✓</div><div class="op-txt"><strong>Nenhuma</strong><span>Sou saudável</span></div></label>
        <label class="op"><input type="checkbox" name="condicao" value="diabetes"><div class="op-check">✓</div><div class="op-txt"><strong>Diabetes ou pré-diabetes</strong></div></label>
        <label class="op"><input type="checkbox" name="condicao" value="hipertensao"><div class="op-check">✓</div><div class="op-txt"><strong>Hipertensão</strong></div></label>
        <label class="op"><input type="checkbox" name="condicao" value="colesterol alto"><div class="op-check">✓</div><div class="op-txt"><strong>Colesterol alto</strong></div></label>
        <label class="op"><input type="checkbox" name="condicao" value="hipotireoidismo"><div class="op-check">✓</div><div class="op-txt"><strong>Hipotireoidismo / Tireoidismo</strong></div></label>
        <label class="op"><input type="checkbox" name="condicao" value="sindrome do ovario policistico"><div class="op-check">✓</div><div class="op-txt"><strong>SOP (Síndrome do Ovário Policístico)</strong></div></label>
        <label class="op"><input type="checkbox" name="condicao" value="outra condicao"><div class="op-check">✓</div><div class="op-txt"><strong>Outra condição</strong></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Como está sua qualidade de sono?</label>
      <div class="opcoes" id="sono">
        <label class="op"><input type="radio" name="sono" value="sono ruim menos de 6h"><div class="op-check">✓</div><div class="op-txt"><strong>Ruim</strong><span>Menos de 6h ou sono interrompido</span></div></label>
        <label class="op"><input type="radio" name="sono" value="sono regular 6 a 7h"><div class="op-check">✓</div><div class="op-txt"><strong>Regular</strong><span>6 a 7h mas poderia melhorar</span></div></label>
        <label class="op"><input type="radio" name="sono" value="sono bom 7 a 8h"><div class="op-check">✓</div><div class="op-txt"><strong>Bom</strong><span>7 a 8h e acordo descansado</span></div></label>
        <label class="op"><input type="radio" name="sono" value="sono otimo mais de 8h"><div class="op-check">✓</div><div class="op-txt"><strong>Ótimo</strong><span>Mais de 8h e durmo muito bem</span></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Seu nível de estresse no dia a dia?</label>
      <div class="opcoes" id="estresse">
        <label class="op"><input type="radio" name="estresse" value="baixo estresse"><div class="op-check">✓</div><div class="op-txt"><strong>Baixo</strong><span>Vida tranquila e equilibrada</span></div></label>
        <label class="op"><input type="radio" name="estresse" value="moderado estresse"><div class="op-check">✓</div><div class="op-txt"><strong>Moderado</strong><span>Estressado mas consigo gerenciar</span></div></label>
        <label class="op"><input type="radio" name="estresse" value="alto estresse"><div class="op-check">✓</div><div class="op-txt"><strong>Alto</strong><span>Muito estressado com frequência</span></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Usa algum medicamento ou suplemento atualmente?</label>
      <textarea id="medicamentos" placeholder="Ex: tomo anticoncepcional, vitamina D, whey protein..."></textarea>
    </div>

    <div class="btn-nav">
      <button class="btn-prev" onclick="prevStep()">← Voltar</button>
      <button class="btn-next" onclick="nextStep()">Continuar →</button>
    </div>
  </div>

  <!-- STEP 6: DIFICULDADES -->
  <div class="step" id="step-5">
    <div class="step-header">
      <span class="step-num">06 / 07</span>
      <h2>Suas <em>dificuldades</em></h2>
      <p>Entender o que já não funcionou é tão importante quanto saber o que você quer.</p>
    </div>

    <div class="campo">
      <label>Quais são suas maiores dificuldades com alimentação? <span class="obrig">*</span></label>
      <div class="opcoes" id="dificuldades">
        <label class="op"><input type="checkbox" name="dificuldade" value="compulsao alimentar"><div class="op-check">✓</div><div class="op-txt"><strong>Compulsão alimentar</strong><span>Como muito em certos momentos</span></div></label>
        <label class="op"><input type="checkbox" name="dificuldade" value="falta de tempo"><div class="op-check">✓</div><div class="op-txt"><strong>Falta de tempo</strong><span>Não consigo preparar comida saudável</span></div></label>
        <label class="op"><input type="checkbox" name="dificuldade" value="comer fora de casa"><div class="op-check">✓</div><div class="op-txt"><strong>Como muito fora de casa</strong><span>Difícil manter a dieta em restaurantes</span></div></label>
        <label class="op"><input type="checkbox" name="dificuldade" value="doce e processados"><div class="op-check">✓</div><div class="op-txt"><strong>Vício em doce / ultraprocessados</strong></div></label>
        <label class="op"><input type="checkbox" name="dificuldade" value="consistencia"><div class="op-check">✓</div><div class="op-txt"><strong>Falta de consistência</strong><span>Começo bem mas não consigo manter</span></div></label>
        <label class="op"><input type="checkbox" name="dificuldade" value="ansiedade e emocional"><div class="op-check">✓</div><div class="op-txt"><strong>Como por ansiedade / emoção</strong></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Já tentou alguma dieta ou plano alimentar antes?</label>
      <textarea id="tentativas" placeholder="Ex: já tentei low carb, dieta da proteína, jejum intermitente... funcionou por X dias mas..."></textarea>
    </div>

    <div class="campo">
      <label>O que você acha que é o maior obstáculo para atingir seu objetivo?</label>
      <textarea id="obstaculo" placeholder="Ex: minha rotina agitada, falta de motivação, não sei o que comer..."></textarea>
    </div>

    <div class="btn-nav">
      <button class="btn-prev" onclick="prevStep()">← Voltar</button>
      <button class="btn-next" onclick="nextStep()">Continuar →</button>
    </div>
  </div>

  <!-- STEP 7: PERSONALIDADE -->
  <div class="step" id="step-6">
    <div class="step-header">
      <span class="step-num">07 / 07</span>
      <h2>Sobre <em>você</em></h2>
      <p>Últimas informações para tornar seu guia ainda mais personalizado.</p>
    </div>

    <div class="campo">
      <label>Como você se descreveria?</label>
      <div class="opcoes" id="personalidade">
        <label class="op"><input type="checkbox" name="personalidade" value="disciplinado"><div class="op-check">✓</div><div class="op-txt"><strong>Disciplinado quando tenho um plano claro</strong></div></label>
        <label class="op"><input type="checkbox" name="personalidade" value="preciso de motivacao"><div class="op-check">✓</div><div class="op-txt"><strong>Preciso de motivação constante</strong></div></label>
        <label class="op"><input type="checkbox" name="personalidade" value="gosto de variedade"><div class="op-check">✓</div><div class="op-txt"><strong>Gosto de variedade nas refeições</strong></div></label>
        <label class="op"><input type="checkbox" name="personalidade" value="prefiro rotina fixa"><div class="op-check">✓</div><div class="op-txt"><strong>Prefiro rotina fixa e repetitiva</strong></div></label>
        <label class="op"><input type="checkbox" name="personalidade" value="social come fora"><div class="op-check">✓</div><div class="op-txt"><strong>Tenho vida social ativa (come fora com frequência)</strong></div></label>
      </div>
    </div>

    <div class="campo">
      <label>Tem alguma meta específica de peso ou resultado?</label>
      <input type="text" id="meta_especifica" placeholder="Ex: quero chegar a 60kg, quero perder 10kg em 3 meses...">
    </div>

    <div class="campo">
      <label>Algo mais que queira nos contar? <span style="color:rgba(245,240,224,0.3);font-weight:300;">(muito importante!)</span></label>
      <textarea id="info_extra" placeholder="Qualquer informação adicional sobre sua saúde, rotina, objetivos ou limitações que possa ajudar a personalizar seu guia..."></textarea>
      <small>Este é o campo mais importante! Quanto mais você contar, melhor será seu guia.</small>
    </div>

    <div class="campo">
      <label>Seu e-mail para receber atualizações <span class="obrig">*</span></label>
      <input type="email" id="email" placeholder="seuemail@exemplo.com">
    </div>

    <div class="btn-nav">
      <button class="btn-prev" onclick="prevStep()">← Voltar</button>
      <button class="btn-next" onclick="gerarGuia()" id="btnGerar">🥗 Gerar meu guia personalizado</button>
    </div>
  </div>

  <!-- LOADING -->
  <div class="loading-screen" id="loadingScreen">
    <div class="loading-spinner"></div>
    <p class="loading-txt">Criando seu guia personalizado...</p>
    <p class="loading-sub">Estamos analisando suas informações e montando<br>um plano exclusivo para você.</p>
    <div class="loading-steps">
      <div class="lstep active" id="ls1"><span class="lstep-icon">🔍</span> Analisando seu perfil</div>
      <div class="lstep" id="ls2"><span class="lstep-icon">🧮</span> Calculando IMC e calorias ideais</div>
      <div class="lstep" id="ls3"><span class="lstep-icon">🥗</span> Montando plano alimentar</div>
      <div class="lstep" id="ls4"><span class="lstep-icon">💪</span> Criando treino personalizado</div>
      <div class="lstep" id="ls5"><span class="lstep-icon">📋</span> Finalizando seu PDF</div>
    </div>
  </div>

  <!-- RESULTADO -->
  <div class="resultado-screen" id="resultadoScreen">
    <div class="resultado-icon">🎉</div>
    <h2 class="resultado-h">Seu guia está <em>pronto!</em></h2>
    <p class="resultado-sub">Seu guia nutricional e de treino personalizado foi gerado com sucesso. Clique abaixo para baixar seu PDF exclusivo.</p>
    <button class="btn-download-pdf" id="btnDownload" onclick="downloadPDF()">⬇️ Baixar meu guia em PDF</button>
    <p style="margin-top:16px;font-size:11px;color:rgba(245,240,224,0.2);letter-spacing:1px;">Acesso vitalício — este é o seu guia exclusivo</p>
  </div>

</div>

<script>
var currentStep = 0;
var totalSteps = 7;
var guiaContent = '';

function updateProgress(){
  var pct = ((currentStep) / totalSteps) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('navStep').textContent = 'Passo ' + (currentStep+1) + ' de ' + totalSteps;
  var dots = document.querySelectorAll('.step-dot');
  dots.forEach(function(d,i){
    d.classList.remove('active','done');
    if(i < currentStep) d.classList.add('done');
    else if(i === currentStep) d.classList.add('active');
  });
}

function nextStep(){
  if(!validateStep()) return;
  if(currentStep < totalSteps - 1){
    document.getElementById('step-'+currentStep).classList.remove('active');
    currentStep++;
    document.getElementById('step-'+currentStep).classList.add('active');
    updateProgress();
    window.scrollTo({top:0,behavior:'smooth'});
  }
}

function prevStep(){
  if(currentStep > 0){
    document.getElementById('step-'+currentStep).classList.remove('active');
    currentStep--;
    document.getElementById('step-'+currentStep).classList.add('active');
    updateProgress();
    window.scrollTo({top:0,behavior:'smooth'});
  }
}

function validateStep(){
  var ok = true;
  if(currentStep === 0){
    if(!document.getElementById('nome').value.trim()){ alert('Por favor, informe seu nome.'); ok=false; }
    else if(!document.getElementById('idade').value){ alert('Por favor, informe sua idade.'); ok=false; }
    else if(!document.getElementById('sexo').value){ alert('Por favor, selecione seu sexo.'); ok=false; }
    else if(!document.getElementById('peso').value){ alert('Por favor, informe seu peso.'); ok=false; }
    else if(!document.getElementById('altura').value){ alert('Por favor, informe sua altura.'); ok=false; }
    else if(!document.querySelector('input[name="objetivo"]:checked')){ alert('Por favor, selecione seu objetivo.'); ok=false; }
  }
  if(currentStep === 1){
    if(!document.querySelector('input[name="rotina_trabalho"]:checked')){ alert('Por favor, selecione sua rotina de trabalho.'); ok=false; }
  }
  if(currentStep === 2){
    if(!document.querySelector('input[name="num_refeicoes"]:checked')){ alert('Por favor, selecione quantas refeições faz.'); ok=false; }
  }
  if(currentStep === 3){
    if(!document.querySelector('input[name="pratica_exercicio"]:checked')){ alert('Por favor, selecione seu nível de atividade.'); ok=false; }
    if(!document.querySelector('input[name="academia"]:checked')){ alert('Por favor, selecione sua preferência de treino.'); ok=false; }
  }
  if(currentStep === 6){
    if(!document.getElementById('email').value){ alert('Por favor, informe seu e-mail.'); ok=false; }
  }
  return ok;
}

// Seleção visual radio/checkbox
document.querySelectorAll('.op').forEach(function(op){
  op.addEventListener('click', function(){
    var input = this.querySelector('input');
    if(input.type === 'radio'){
      var name = input.name;
      document.querySelectorAll('input[name="'+name+'"]').forEach(function(r){
        r.closest('.op').classList.remove('selected');
      });
      input.checked = true;
      this.classList.add('selected');
    } else {
      input.checked = !input.checked;
      this.classList.toggle('selected', input.checked);
    }
  });
});

function coletarDados(){
  var getRadio = function(name){ var r = document.querySelector('input[name="'+name+'"]:checked'); return r ? r.value : 'não informado'; };
  var getCheckboxes = function(name){ var rs = document.querySelectorAll('input[name="'+name+'"]:checked'); return Array.from(rs).map(function(r){return r.value;}).join(', ') || 'nenhum'; };
  var getVal = function(id){ var el = document.getElementById(id); return el && el.value.trim() ? el.value.trim() : 'não informado'; };

  var peso = parseFloat(getVal('peso'));
  var altura = parseFloat(getVal('altura'));
  var imc = peso && altura ? (peso / Math.pow(altura/100, 2)).toFixed(1) : 'não calculado';

  return {
    nome: getVal('nome'),
    idade: getVal('idade'),
    sexo: getVal('sexo'),
    peso: getVal('peso') + 'kg',
    altura: getVal('altura') + 'cm',
    imc: imc,
    objetivo: getRadio('objetivo'),
    rotina_trabalho: getRadio('rotina_trabalho'),
    horario_acordar: getVal('horario_acordar'),
    tempo_cozinhar: getRadio('tempo_cozinhar'),
    rotina_detalhe: getVal('rotina_detalhe'),
    num_refeicoes: getRadio('num_refeicoes'),
    restricoes: getCheckboxes('restricoes'),
    nao_gosta: getVal('nao_gosta'),
    mais_gosta: getVal('mais_gosta'),
    alimentacao_atual: getVal('alimentacao_atual'),
    pratica_exercicio: getRadio('pratica_exercicio'),
    academia: getRadio('academia'),
    tempo_treino: getRadio('tempo_treino'),
    atividades_gosta: getVal('atividades_gosta'),
    condicao_saude: getCheckboxes('condicao'),
    sono: getRadio('sono'),
    estresse: getRadio('estresse'),
    medicamentos: getVal('medicamentos'),
    dificuldades: getCheckboxes('dificuldade'),
    tentativas: getVal('tentativas'),
    obstaculo: getVal('obstaculo'),
    personalidade: getCheckboxes('personalidade'),
    meta_especifica: getVal('meta_especifica'),
    info_extra: getVal('info_extra'),
    email: getVal('email')
  };
}

function animateLoadingSteps(){
  var steps = ['ls1','ls2','ls3','ls4','ls5'];
  var delays = [0, 8000, 18000, 30000, 45000];
  steps.forEach(function(id, i){
    setTimeout(function(){
      steps.forEach(function(s){ document.getElementById(s).classList.remove('active'); });
      if(i > 0) document.getElementById(steps[i-1]).classList.add('done');
      document.getElementById(id).classList.add('active');
    }, delays[i]);
  });
}

async function gerarGuia(){
  if(!validateStep()) return;
  var dados = coletarDados();

  // Esconde form, mostra loading
  document.getElementById('step-6').classList.remove('active');
  document.getElementById('stepsNav').style.display = 'none';
  document.querySelector('.form-hero').style.display = 'none';
  document.getElementById('loadingScreen').classList.add('show');
  animateLoadingSteps();

  var prompt = \`Você é um nutricionista altamente experiente, com mais de 15 anos de atuação clínica, formado e com pós-graduação em nutrição clínica, esportiva e comportamento alimentar.

DADOS DO PACIENTE:
- Nome: \${dados.nome}
- Idade: \${dados.idade} anos
- Sexo: \${dados.sexo}
- Peso: \${dados.peso} | Altura: \${dados.altura} | IMC: \${dados.imc}
- Objetivo principal: \${dados.objetivo}
- Rotina de trabalho: \${dados.rotina_trabalho}
- Horário que acorda: \${dados.horario_acordar}
- Tempo para cozinhar: \${dados.tempo_cozinhar}
- Rotina detalhada: \${dados.rotina_detalhe}
- Refeições por dia: \${dados.num_refeicoes}
- Restrições alimentares: \${dados.restricoes}
- Não gosta de: \${dados.nao_gosta}
- Gosta de: \${dados.mais_gosta}
- Alimentação atual: \${dados.alimentacao_atual}
- Nível de atividade: \${dados.pratica_exercicio}
- Academia/treino: \${dados.academia}
- Tempo disponível para treino: \${dados.tempo_treino}
- Atividades de interesse: \${dados.atividades_gosta}
- Condições de saúde: \${dados.condicao_saude}
- Qualidade do sono: \${dados.sono}
- Nível de estresse: \${dados.estresse}
- Medicamentos/suplementos: \${dados.medicamentos}
- Dificuldades: \${dados.dificuldades}
- Tentativas anteriores: \${dados.tentativas}
- Principal obstáculo: \${dados.obstaculo}
- Personalidade: \${dados.personalidade}
- Meta específica: \${dados.meta_especifica}
- Informações extras: \${dados.info_extra}

Crie um GUIA NUTRICIONAL E DE TREINO COMPLETO E TOTALMENTE PERSONALIZADO para \${dados.nome}. O guia deve ser em português brasileiro, profissional, humanizado e baseado em evidências.

ESTRUTURA OBRIGATÓRIA:

# GUIA NUTRICIONAL PERSONALIZADO
## \${dados.nome} | \${dados.objetivo}

---

## 1. ANÁLISE DO SEU PERFIL
[Análise completa do perfil, IMC calculado com classificação, pontos positivos e de atenção]

## 2. SEUS NÚMEROS PERSONALIZADOS
- IMC: \${dados.imc} [classificação]
- Gasto calórico basal (TMB)
- Gasto calórico total (GET) considerando nível de atividade
- Meta calórica para o objetivo
- Distribuição de macronutrientes (proteína, carboidrato, gordura em gramas e %)
[Explique de forma simples o que cada número significa]

## 3. ESTRATÉGIA NUTRICIONAL
[Explique a estratégia definida e por que é ideal para o perfil desta pessoa]

## 4. PLANO ALIMENTAR COMPLETO
[Para cada refeição: sugestão principal + opções de substituição + quantidades em medidas caseiras + calorias aproximadas de cada alimento]

Café da manhã:
Lanche da manhã:
Almoço:
Lanche da tarde:
Jantar:
Ceia (se necessário):

## 5. PLANEJAMENTO SEMANAL
[Segunda a domingo com variações práticas]

## 6. LISTA DE COMPRAS
[Separada por proteínas, carboidratos, gorduras boas, verduras/legumes, itens práticos]

## 7. SUPLEMENTOS E VITAMINAS RECOMENDADOS
[Baseado no perfil, objetivo e condições de saúde informadas. Inclua dosagem sugerida e motivo. Mencione antivermes se relevante.]

## 8. ORIENTAÇÕES COMPORTAMENTAIS
[Estratégias para as dificuldades específicas informadas]

## 9. TREINO PERSONALIZADO
[Baseado na preferência de academia/casa e nível informado]
- Se academia: treino completo com exercícios, séries, repetições, descanso
- Se casa/sem academia: treino com peso corporal + sugestões de esportes/atividades que combinam com o perfil e personalidade
- Frequência semanal recomendada

## 10. ESTILO DE VIDA
[Sono, estresse, hábitos que impactam os resultados]

## 11. RESUMO RÁPIDO
[Versão condensada para consulta rápida]

## 12. MENSAGEM FINAL
[Mensagem humanizada e motivadora de nutricionista experiente, entre 8 a 15 linhas, texto corrido sem listas, acolhedor e profissional]\`;

  try {
    var response = await fetch('/api/gerar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt: prompt, nome: dados.nome })
    });
    var result = await response.json();
    if(result.content){
      guiaContent = result.content;
      // Finaliza loading
      setTimeout(function(){
        document.getElementById('ls4').classList.add('done');
        document.getElementById('ls5').classList.add('active');
        setTimeout(function(){
          document.getElementById('ls5').classList.add('done');
          document.getElementById('loadingScreen').classList.remove('show');
          document.getElementById('resultadoScreen').classList.add('show');
        }, 2000);
      }, 2000);
    } else {
      throw new Error('Sem conteúdo');
    }
  } catch(e) {
    document.getElementById('loadingScreen').classList.remove('show');
    alert('Houve um erro ao gerar seu guia. Por favor, tente novamente.');
    document.getElementById('step-6').classList.add('active');
    document.getElementById('stepsNav').style.display = 'flex';
    document.querySelector('.form-hero').style.display = 'block';
  }
}

function downloadPDF(){
  var btn = document.getElementById('btnDownload');
  btn.textContent = '⏳ Preparando PDF...';
  btn.disabled = true;

  fetch('/api/gerarpdf', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ content: guiaContent })
  })
  .then(function(r){ return r.blob(); })
  .then(function(blob){
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'meu-guia-nutricional-personalizado.pdf';
    a.click();
    btn.textContent = '✅ PDF baixado!';
    btn.disabled = false;
  })
  .catch(function(){
    btn.textContent = '⬇️ Baixar meu guia em PDF';
    btn.disabled = false;
    alert('Erro ao gerar PDF. Tente novamente.');
  });
}
</script>
</body>
</html>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
