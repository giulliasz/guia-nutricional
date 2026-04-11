export default function Obrigado() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>Seu Guia Chegou! — Seu Nutricionista</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,700&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --v1:#0a1f0e;--v2:#0d2810;--v3:#1a4a20;
  --creme:#f5f0e0;--laranja:#e8934a;--laranja2:#f0a85a;--laranja3:#fac070;
  --bl:rgba(232,147,74,0.25);--bv:rgba(143,207,154,0.13);
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{
  background:var(--v1);
  color:var(--creme);
  font-family:'Jost',sans-serif;
  min-height:100vh;
  overflow-x:hidden;
  overflow-y:auto;
  -webkit-overflow-scrolling:touch;
}
body{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  padding:40px 24px 60px;
}

.card{
  background:rgba(255,255,255,0.04);
  border:1px solid var(--bl);
  padding:44px 36px;
  max-width:520px;width:100%;
  text-align:center;
  position:relative;
  margin-top:20px;
}

.card::before,.card::after{
  content:'';position:absolute;width:16px;height:16px;
  border-color:var(--laranja);border-style:solid;
}
.card::before{top:-1px;left:-1px;border-width:2px 0 0 2px;}
.card::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}

.emoji{font-size:48px;margin-bottom:14px;display:block;}

.tag{
  display:inline-block;border:1px solid var(--bl);
  color:var(--laranja3);font-size:10px;letter-spacing:3px;text-transform:uppercase;
  padding:6px 16px;margin-bottom:18px;
}

h1{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(26px,5vw,38px);font-weight:700;line-height:1.1;
  color:var(--creme);margin-bottom:10px;
}
h1 em{font-style:italic;color:var(--laranja2);}

.sub{
  font-size:14px;font-weight:300;
  color:rgba(245,240,224,0.6);line-height:1.8;
  margin-bottom:28px;
}
.sub strong{color:var(--creme);font-weight:600;}

.div-line{
  width:100%;height:1px;
  background:linear-gradient(90deg,transparent,var(--bl),transparent);
  margin:24px 0;
}

/* Botão download */
.btn-download{
  display:flex;align-items:center;justify-content:center;gap:10px;
  background:var(--v3);border:1px solid rgba(143,207,154,0.25);
  color:var(--creme);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:600;font-size:14px;
  letter-spacing:1px;padding:16px 24px;
  transition:background 0.2s,transform 0.2s;
  margin-bottom:8px;
  width:100%;
}
.btn-download:hover{background:#2d6a35;transform:translateY(-2px);}

.btn-download-note{
  font-size:11px;color:rgba(245,240,224,0.3);
  letter-spacing:1px;margin-bottom:20px;
  text-align:center;
}

/* Botão Guia Completo */
.btn-guia-completo{
  display:flex;align-items:center;justify-content:center;gap:10px;
  background:rgba(232,147,74,0.15);
  border:1px solid var(--bl);
  color:var(--laranja2);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:600;font-size:14px;
  letter-spacing:1px;padding:16px 24px;
  transition:background 0.2s,transform 0.2s;
  margin-bottom:8px;
  width:100%;
}
.btn-guia-completo:hover{background:rgba(232,147,74,0.25);transform:translateY(-2px);}

.separador{
  display:flex;align-items:center;gap:10px;margin:16px 0;
}
.separador span{font-size:11px;color:rgba(245,240,224,0.2);letter-spacing:2px;text-transform:uppercase;white-space:nowrap;}
.separador::before,.separador::after{content:'';flex:1;height:1px;background:rgba(245,240,224,0.06);}

/* Botão Kiwify */
.btn-guia{
  display:flex;align-items:center;justify-content:center;gap:10px;
  background:var(--laranja);color:var(--v1);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:700;font-size:14px;
  letter-spacing:1.5px;text-transform:uppercase;padding:18px 24px;
  transition:background 0.2s,transform 0.2s,box-shadow 0.2s;
  width:100%;
}
.btn-guia:hover{background:var(--laranja2);transform:translateY(-3px);box-shadow:0 16px 40px rgba(232,147,74,0.35);}

.btn-guia-note{
  font-size:11px;color:rgba(245,240,224,0.2);
  letter-spacing:1px;margin-top:8px;text-align:center;
}

.footer-note{
  margin-top:24px;
  font-size:11px;color:rgba(245,240,224,0.15);
  line-height:1.7;text-align:center;
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
    ⬇️ Baixar Guia de Receitas Grátis
  </a>
  <p class="btn-download-note">PDF gratuito · 8 receitas práticas · até 15 minutos</p>

  <!-- BOTÃO IR PARA GUIA COMPLETO -->
  <a href="https://pay.kiwify.com.br/y8GYnfg" target="_blank" class="btn-guia-completo">
    📋 Ir para o Guia Completo!
  </a>

  <div class="separador"><span>ou invista no seu plano completo</span></div>

  <div class="div-line"></div>

  <p class="sub" style="margin-bottom:16px;">
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
