export default function Obrigado() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Seu Guia Chegou! — Seu Nutricionista</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,700&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --v1:#0a1f0e;--v2:#0d2810;--v3:#1a4a20;
  --claro:#8fcf9a;--creme:#f5f0e0;
  --laranja:#e8934a;--laranja2:#f0a85a;--laranja3:#fac070;
  --preto:#050e06;--bv:rgba(143,207,154,0.13);--bl:rgba(232,147,74,0.25);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--v1);color:var(--creme);font-family:'Jost',sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;position:relative;overflow:hidden;}

body::before{
  content:'';position:fixed;inset:0;
  background:radial-gradient(ellipse 120% 70% at 50% 0%,#1a4a20 0%,transparent 55%);
  pointer-events:none;
}

body::after{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events:none;z-index:9999;opacity:0.5;
}

.card{
  background:rgba(255,255,255,0.04);
  border:1px solid var(--bl);
  padding:52px 44px;
  max-width:560px;width:100%;
  text-align:center;
  position:relative;z-index:1;
  animation:fadeUp 0.7s ease both;
}

.card::before,.card::after{
  content:'';position:absolute;width:18px;height:18px;
  border-color:var(--laranja);border-style:solid;
}
.card::before{top:-1px;left:-1px;border-width:2px 0 0 2px;}
.card::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}

.emoji{font-size:52px;margin-bottom:16px;display:block;}

.tag{
  display:inline-block;border:1px solid var(--bl);
  color:var(--laranja3);font-size:10px;letter-spacing:3px;text-transform:uppercase;
  padding:6px 16px;margin-bottom:20px;
}

h1{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(28px,5vw,42px);font-weight:700;line-height:1.1;
  color:var(--creme);margin-bottom:12px;
}

h1 em{font-style:italic;color:var(--laranja2);}

.sub{
  font-size:15px;font-weight:300;
  color:rgba(245,240,224,0.6);line-height:1.8;
  margin-bottom:36px;
}

.sub strong{color:var(--creme);font-weight:600;}

.div-line{
  width:100%;height:1px;
  background:linear-gradient(90deg,transparent,var(--bl),transparent);
  margin:28px 0;
}

/* Botão download */
.btn-download{
  display:flex;align-items:center;justify-content:center;gap:12px;
  background:var(--v3);border:1px solid rgba(143,207,154,0.25);
  color:var(--creme);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:600;font-size:14px;
  letter-spacing:1px;padding:18px 32px;
  transition:background 0.2s,transform 0.2s;
  margin-bottom:12px;
}
.btn-download:hover{background:#2d6a35;transform:translateY(-2px);}
.btn-download .icon{font-size:20px;}

.btn-download-note{
  font-size:11px;color:rgba(245,240,224,0.3);
  letter-spacing:1px;margin-bottom:28px;
}

/* Botão Kiwify */
.btn-guia{
  display:flex;align-items:center;justify-content:center;gap:10px;
  background:var(--laranja);color:var(--v1);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:700;font-size:14px;
  letter-spacing:1.5px;text-transform:uppercase;padding:20px 32px;
  transition:background 0.2s,transform 0.2s,box-shadow 0.2s;
}
.btn-guia:hover{background:var(--laranja2);transform:translateY(-3px);box-shadow:0 20px 52px rgba(232,147,74,0.38);}

.btn-guia-note{
  font-size:11px;color:rgba(245,240,224,0.25);
  letter-spacing:1px;margin-top:10px;
}

.separador{
  display:flex;align-items:center;gap:12px;margin:20px 0;
}
.separador span{font-size:11px;color:rgba(245,240,224,0.25);letter-spacing:2px;text-transform:uppercase;white-space:nowrap;}
.separador::before,.separador::after{content:'';flex:1;height:1px;background:rgba(245,240,224,0.08);}

.footer-note{
  margin-top:28px;
  font-size:11px;color:rgba(245,240,224,0.2);
  line-height:1.7;
}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:520px){
  .card{padding:36px 24px;}
}
</style>
</head>
<body>

<div class="card">
  <span class="emoji">🎉</span>
  <div class="tag">Acesso liberado</div>
  <h1>Seu guia chegou,<br><em>aproveite!</em></h1>
  <p class="sub">
    Obrigado por se cadastrar!<br>
    Clique abaixo para <strong>baixar seu Guia de Receitas Rápidas</strong> — completamente gratuito.
  </p>

  <!-- BOTÃO DOWNLOAD RECEITAS -->
  <a href="https://drive.google.com/file/d/1MCaUIbD8ofyJyPdIvmcxdoXf3TnkZEai/view?usp=drive_link" target="_blank" class="btn-download">
    <span class="icon">⬇️</span>
    Baixar Guia de Receitas Grátis
  </a>
  <p class="btn-download-note">PDF gratuito · 8 receitas práticas · até 15 minutos</p>

  <div class="separador"><span>e que tal dar um passo além?</span></div>

  <div class="div-line"></div>

  <p class="sub" style="margin-bottom:20px;">
    Quer um <strong>plano nutricional e de treino 100% personalizado</strong> para você?<br>
    Por apenas R$20,00 — acesso vitalício, entregue na hora.
  </p>

  <!-- BOTÃO KIWIFY -->
  <a href="https://pay.kiwify.com.br/y8GYnfg" target="_blank" class="btn-guia">
    Seguir para meu guia completo! — R$20,00
  </a>
  <p class="btn-guia-note">Pagamento único · Acesso vitalício · 7 dias de garantia</p>

  <p class="footer-note">
    Material informativo e educativo · Não substitui acompanhamento médico ou nutricional clínico
  </p>
</div>

</body>
</html>
` }} />
  );
}
