export default function Home() {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
        });
      },{threshold:0.07});
      document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

      window.fecharPopup = function(){
        var p = document.getElementById('leadPopup');
        if(p) p.classList.remove('show');
      };
      window.irParaForms = function(){
        window.fecharPopup();
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSd2LCxRtbzcjeteA3w7EB6yT5WYtLNOoH9zY_eBkawZJ-A03w/viewform', '_blank');
      };
      window.irParaPagamento = function(){
        window.fecharPopup();
        window.location.href = 'https://pay.kiwify.com.br/y8GYnfg';
      };
      function initPopup(){
        document.querySelectorAll('a[href="https://pay.kiwify.com.br/y8GYnfg"]').forEach(function(btn){
          btn.onclick = function(e){
            e.preventDefault();
            var p = document.getElementById('leadPopup');
            if(p) p.classList.add('show');
          };
        });
      }
      initPopup();
      setTimeout(initPopup, 1000);
      setTimeout(initPopup, 2500);

      var chatHistorico = [];
      var chatEnviando = false;

      window.toggleChat = function(){
        var win = document.getElementById('chatWindow');
        var btn = document.getElementById('chatBtn');
        if(!win) return;
        var aberto = win.classList.toggle('open');
        if(btn) btn.textContent = aberto ? '×' : '💬';
        if(aberto){ var inp = document.getElementById('chatInput'); if(inp) inp.focus(); }
      };

      window.addChatMsg = function(role, text){
        var msgs = document.getElementById('chatMsgs');
        if(!msgs) return;
        var t = document.getElementById('chatTyping');
        if(t) t.className = 'chat-typing';
        var div = document.createElement('div');
        div.className = 'cmsg ' + role;
        div.innerHTML = (role==='bot'?'<div class="cmsg-av">🥗</div>':'<div class="cmsg-av">👤</div>') +
          '<div class="cmsg-bubble">' + text.replace(/\n/g,'<br>') + '</div>';
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
      };

      window.showTyping = function(show){
        var t = document.getElementById('chatTyping');
        if(t) t.className = 'chat-typing' + (show?' show':'');
        var msgs = document.getElementById('chatMsgs');
        if(show && msgs) msgs.scrollTop = 99999;
      };

      window.enviarChat = async function(){
        var input = document.getElementById('chatInput');
        if(!input) return;
        var texto = input.value.trim();
        if(!texto || chatEnviando) return;
        var sugs = document.getElementById('chatSugs');
        if(sugs) sugs.style.display = 'none';
        input.value = '';
        input.style.height = 'auto';
        window.addChatMsg('user', texto);
        chatHistorico.push({role:'user', content:texto});
        chatEnviando = true;
        var btn = document.getElementById('chatSend');
        if(btn) btn.disabled = true;
        window.showTyping(true);
        try {
          var res = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({messages: chatHistorico})
          });
          var data = await res.json();
          var resposta = data.response || 'Desculpe, tive um problema. Tente novamente!';
          chatHistorico.push({role:'assistant', content:resposta});
          window.addChatMsg('bot', resposta);
        } catch(e) {
          window.showTyping(false);
          window.addChatMsg('bot', 'Ops, problema de conexão. Tente novamente! 🙏');
        }
        chatEnviando = false;
        if(btn) btn.disabled = false;
      };

      window.usarSug = function(btn){
        var inp = document.getElementById('chatInput');
        if(inp){ inp.value = btn.textContent; window.enviarChat(); }
      };

      var chatInput = document.getElementById('chatInput');
      if(chatInput){
        chatInput.addEventListener('keydown', function(e){
          if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); window.enviarChat(); }
        });
        chatInput.addEventListener('input', function(){
          this.style.height='auto';
          this.style.height=Math.min(this.scrollHeight,80)+'px';
        });
      }

    }, 200);
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Seu Nutricionista — Guia Nutricional Personalizado</title>

<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1497711831868325');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1497711831868325&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
:root{
  --v1:#0a1f0e;
  --v2:#0d2810;
  --v3:#1a4a20;
  --v4:#2d6a35;
  --claro:#8fcf9a;
  --creme:#f5f0e0;
  --creme3:#faf7ee;
  --laranja:#e8934a;
  --laranja2:#f0a85a;
  --laranja3:#fac070;
  --preto:#050e06;
  --bv:rgba(143,207,154,0.13);
  --bl:rgba(232,147,74,0.25);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--v1);color:var(--creme);font-family:'Jost',sans-serif;overflow-x:hidden}

body::before{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events:none;z-index:9999;opacity:0.5;
}

/* ══ CTA FLUTUANTE ══ */






/* ══ NAV ══ */
nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:15px 40px;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(10,31,14,0.95);
  backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(143,207,154,0.07);
}
.nav-logo{
  font-family:'Cormorant Garamond',serif;
  font-size:19px;font-style:italic;font-weight:600;color:var(--creme);
}
.nav-logo span{color:var(--laranja2);}

/* ══ BTN ══ */
.btn{
  display:inline-block;
  background:var(--laranja);color:var(--v1);
  font-family:'Jost',sans-serif;font-weight:700;font-size:13px;
  letter-spacing:2px;text-transform:uppercase;text-decoration:none;
  padding:12px 32px;border:none;cursor:pointer;
  transition:transform 0.2s,box-shadow 0.2s,background 0.2s;
}
.btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(232,147,74,0.4);background:var(--laranja2);}
.btn-lg{padding:18px 64px;font-size:14px;}
.btn-full{display:block;text-align:center;width:100%;padding:18px;}

/* ══ HERO — centralizado ══ */
.hero{
  min-height:100vh;
  display:flex;flex-direction:column;
  justify-content:center;align-items:center;
  text-align:center;
  padding:120px 24px 100px;
  position:relative;overflow:hidden;
  background:
    radial-gradient(ellipse 140% 80% at 50% -10%,#1a4a20 0%,transparent 55%),
    radial-gradient(ellipse 60% 50% at 20% 100%,rgba(10,46,16,0.6) 0%,transparent 50%),
    var(--v1);
}

.hero::after{
  content:'';position:absolute;bottom:0;left:8%;right:8%;
  height:1px;background:linear-gradient(90deg,transparent,var(--laranja),transparent);
}

.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  border:1px solid var(--bl);color:var(--laranja3);
  font-size:10px;letter-spacing:4px;text-transform:uppercase;
  padding:7px 20px;margin-bottom:32px;
  animation:fadeUp 0.6s ease both;
}
.hero-badge::before{content:'✦';font-size:8px;}

.hero h1{
  max-width:820px;margin:0 auto;
  animation:fadeUp 0.6s 0.1s ease both;
}
.hero h1 .l1{
  display:block;
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(60px,10vw,130px);
  font-weight:700;line-height:0.88;
  color:var(--creme);letter-spacing:-2px;
}
.hero h1 .l2{
  display:block;
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(62px,10.5vw,136px);
  font-weight:700;font-style:italic;
  color:var(--laranja2);line-height:0.92;letter-spacing:-2px;
}
.hero h1 .l3{
  display:block;font-size:11px;font-weight:500;
  letter-spacing:6px;text-transform:uppercase;
  color:rgba(245,240,224,0.35);margin-top:20px;
}

.hero-div{width:44px;height:1px;background:var(--laranja);margin:28px auto;animation:fadeUp 0.6s 0.15s ease both;}

.hero-sub{
  font-size:clamp(15px,1.6vw,18px);font-weight:300;
  color:rgba(245,240,224,0.62);max-width:520px;line-height:1.9;
  animation:fadeUp 0.6s 0.18s ease both;
}
.hero-sub strong{color:var(--creme);font-weight:600;}

/* Card preço hero */
.hero-preco{
  margin-top:32px;
  display:inline-flex;align-items:center;gap:24px;
  background:rgba(232,147,74,0.08);border:1px solid var(--bl);
  padding:20px 32px;
  animation:fadeUp 0.6s 0.22s ease both;
}
.hero-preco .val{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(48px,6vw,72px);font-weight:700;line-height:1;
  color:var(--laranja2);
}
.hero-preco .val sup{font-size:0.45em;vertical-align:top;margin-top:0.3em;display:inline-block;}
.hero-preco .info{text-align:left;}
.hero-preco .info strong{display:block;font-size:13px;font-weight:700;color:var(--creme);letter-spacing:0.5px;margin-bottom:4px;}
.hero-preco .info span{font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;color:var(--laranja3);line-height:1.4;}

.hero-cta{
  margin-top:36px;display:flex;flex-direction:column;align-items:center;gap:8px;
  animation:fadeUp 0.6s 0.26s ease both;
}
.hero-cta small{font-size:11px;color:rgba(245,240,224,0.25);letter-spacing:2px;text-transform:uppercase;}

/* Alimentos decorativos */
.food-strip{
  display:flex;flex-wrap:wrap;justify-content:center;gap:16px;
  margin-top:48px;
  animation:fadeUp 0.6s 0.3s ease both;
}
.food-pill{
  background:rgba(245,240,224,0.04);
  border:1px solid rgba(245,240,224,0.08);
  padding:10px 18px;display:flex;align-items:center;gap:8px;
  font-size:13px;font-weight:300;color:rgba(245,240,224,0.55);
  transition:background 0.25s,border-color 0.25s;
}
.food-pill:hover{background:rgba(245,240,224,0.07);border-color:rgba(232,147,74,0.2);}
.food-pill span{font-size:18px;}

/* ══ FAIXA ══ */
.faixa{
  background:var(--laranja);padding:14px 24px;
  text-align:center;font-size:14px;font-weight:700;
  color:var(--v1);letter-spacing:0.3px;
}
.faixa u{text-underline-offset:3px;}

/* ══ VÍDEO ══ */
.video-sec{
  background:var(--v2);padding:80px 24px;text-align:center;
}
.video-sec h2{
  font-family:'Cormorant Garamond',serif;font-weight:700;
  font-size:clamp(26px,4vw,48px);color:var(--creme);
  margin-bottom:8px;line-height:1.05;
}
.video-sec h2 em{font-style:italic;color:var(--laranja2);}
.video-sec .vsub{font-size:14px;font-weight:300;color:rgba(245,240,224,0.4);margin-bottom:36px;}

/* ══ TROCA PELA URL DO SEU VÍDEO ══ */
.video-wrap{
  max-width:380px;margin:0 auto 24px;
  position:relative;
  background:rgba(0,0,0,0.4);
  border:1px solid rgba(245,240,224,0.07);
  aspect-ratio:9/16;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
  border-radius:16px;
}

/* SE FOR IFRAME YOUTUBE — descomente e cole sua URL: */
/*
.video-wrap iframe{
  position:absolute;inset:0;width:100%;height:100%;border:none;
}
*/

.video-placeholder{
  display:flex;flex-direction:column;align-items:center;gap:12px;
}
.play-btn{
  width:64px;height:64px;border-radius:50%;
  background:var(--laranja);
  display:flex;align-items:center;justify-content:center;
  font-size:22px;color:var(--v1);
  box-shadow:0 0 40px rgba(232,147,74,0.3);
}
.video-placeholder p{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,240,224,0.25);}

.video-legenda{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(16px,2.2vw,22px);font-style:italic;
  color:var(--claro);max-width:500px;margin:0 auto;line-height:1.6;
}

/* ══ SEÇÕES ══ */
.sec{padding:88px 24px;}
.c{max-width:720px;margin:0 auto;}
.cw{max-width:1020px;margin:0 auto;}
.tc{text-align:center;}

.tag-s{
  display:block;font-size:10px;letter-spacing:4px;
  text-transform:uppercase;color:var(--laranja);
  margin-bottom:14px;text-align:center;
}

h2.dk{font-family:'Cormorant Garamond',serif;font-weight:700;line-height:1.05;color:var(--creme);}
h2.dk em{font-style:italic;color:var(--laranja2);}
h2.lt{font-family:'Cormorant Garamond',serif;font-weight:700;line-height:1.05;color:var(--creme3);}
h2.lt em{font-style:italic;color:var(--laranja);}

/* ══ R$37 ══ */
.vinte{
  background:var(--v1);padding:80px 24px;
  text-align:center;position:relative;overflow:hidden;
}
.vinte::before{
  content:'R$37';position:absolute;
  font-family:'Cormorant Garamond',serif;
  font-size:280px;font-weight:900;font-style:italic;
  color:rgba(245,240,224,0.022);
  top:50%;left:50%;transform:translate(-50%,-50%);
  white-space:nowrap;pointer-events:none;letter-spacing:-8px;
}
.vinte-inner{position:relative;z-index:1;max-width:760px;margin:0 auto;}

.vinte-hl{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(30px,5.5vw,64px);
  font-weight:900;line-height:1.0;color:var(--creme);margin-bottom:12px;
}
.vinte-hl em{font-style:italic;color:var(--laranja2);}

.vinte-sub{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(17px,2.5vw,26px);font-style:italic;
  color:var(--laranja3);line-height:1.55;margin-bottom:40px;
}

.compare{display:flex;flex-wrap:wrap;justify-content:center;gap:2px;margin-bottom:40px;}
.ci{
  padding:18px 22px;text-align:center;
  background:rgba(245,240,224,0.03);
  border:1px solid rgba(245,240,224,0.06);min-width:130px;
  transition:background 0.25s;
}
.ci:hover{background:rgba(245,240,224,0.05);}
.ci.hl{background:rgba(232,147,74,0.1);border-color:var(--bl);}
.ci .ic{font-size:22px;margin-bottom:8px;display:block;}
.ci .vl{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:rgba(245,240,224,0.28);display:block;margin-bottom:4px;}
.ci.hl .vl{color:var(--laranja2);}
.ci .dc{font-size:11px;font-weight:300;color:rgba(245,240,224,0.32);line-height:1.4;}
.ci.hl .dc{color:rgba(245,240,224,0.68);}

.vitalicio{
  background:rgba(143,207,154,0.07);border:1px solid var(--bv);
  padding:20px 28px;max-width:500px;margin:0 auto 36px;
  display:flex;gap:14px;align-items:flex-start;text-align:left;
}
.vitalicio .vi{font-size:22px;flex-shrink:0;}
.vitalicio strong{display:block;font-size:14px;font-weight:600;color:var(--claro);margin-bottom:4px;}
.vitalicio p{font-size:13px;font-weight:300;color:rgba(245,240,224,0.5);line-height:1.7;}

/* ══ DOR ══ */
.dor{background:var(--v2);padding:88px 24px;}
.dor-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px;margin:36px 0;}
.dor-card{
  background:rgba(0,0,0,0.25);padding:28px 22px;
  border-bottom:3px solid transparent;
  transition:border-color 0.3s;text-align:center;
}
.dor-card:hover{border-bottom-color:var(--laranja);}
.dor-card .di{font-size:32px;margin-bottom:14px;display:block;}
.dor-card p{font-size:14px;font-weight:300;color:rgba(245,240,224,0.65);line-height:1.7;}
.dor-card p strong{color:var(--creme);font-weight:600;}

.dor-virada{
  max-width:640px;margin:0 auto;
  background:rgba(232,147,74,0.08);border:1px solid var(--bl);
  padding:26px 32px;
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(17px,2.5vw,24px);font-style:italic;
  color:var(--laranja3);line-height:1.6;text-align:center;
}

/* ══ CONTROLE ══ */
.controle{
  background:linear-gradient(150deg,var(--v3) 0%,var(--v1) 100%);
  padding:80px 24px;text-align:center;position:relative;overflow:hidden;
}
.controle::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(143,207,154,0.06) 0%,transparent 65%);
}
.controle-inner{position:relative;z-index:1;max-width:620px;margin:0 auto;}
.controle h2{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(28px,5vw,56px);font-weight:700;
  color:var(--creme);margin-bottom:14px;line-height:1.0;
}
.controle h2 em{font-style:italic;color:var(--laranja2);}
.controle p{font-size:16px;font-weight:300;color:rgba(245,240,224,0.58);line-height:1.9;margin-bottom:32px;}
.controle p strong{color:var(--creme);font-weight:600;}
.ctrl-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:36px;}
.ctrl-tag{
  background:rgba(245,240,224,0.06);border:1px solid rgba(245,240,224,0.1);
  padding:10px 18px;font-size:13px;font-weight:500;
  color:rgba(245,240,224,0.72);display:flex;align-items:center;gap:8px;
}
.ctrl-tag span{color:var(--laranja3);}

/* ══ RECEBE ══ */
.recebe{background:var(--v1);padding:88px 24px;}
.recebe-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1px;}
.recebe-item{
  background:rgba(255,255,255,0.03);padding:28px 26px;
  display:flex;gap:16px;align-items:flex-start;
  border-left:2px solid transparent;
  transition:border-color 0.25s,background 0.25s;
}
.recebe-item:hover{border-left-color:var(--laranja);background:rgba(255,255,255,0.05);}
.rn{
  font-family:'Cormorant Garamond',serif;
  font-size:38px;font-weight:700;color:var(--laranja);opacity:0.25;
  line-height:1;flex-shrink:0;width:34px;
}
.recebe-item h3{font-size:14px;font-weight:600;color:var(--creme);margin-bottom:4px;}
.recebe-item p{font-size:13px;font-weight:300;color:rgba(245,240,224,0.46);line-height:1.65;}

/* ══ FLUXO ══ */
.fluxo{background:var(--v2);padding:88px 24px;}
.fluxo-steps{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:0;position:relative;margin-top:48px;
}
.fluxo-steps::before{
  content:'';position:absolute;top:33px;left:16%;right:16%;
  height:1px;background:linear-gradient(90deg,transparent,var(--laranja),transparent);
}
.fstep{text-align:center;padding:0 16px;position:relative;z-index:1;}
.fsn{
  width:66px;height:66px;border-radius:50%;
  background:var(--v1);border:2px solid var(--laranja);
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 18px;
  font-family:'Cormorant Garamond',serif;
  font-size:26px;font-weight:700;color:var(--laranja);
}
.fstep h3{font-size:14px;font-weight:600;color:var(--creme);margin-bottom:5px;}
.fstep p{font-size:13px;font-weight:300;color:rgba(245,240,224,0.45);line-height:1.6;}

/* ══ FEEDBACKS ══ */
.feed{background:var(--v1);padding:88px 24px;}
.feed-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2px;}
.feed-card{
  background:rgba(255,255,255,0.04);padding:28px 24px;
  border-top:2px solid transparent;
  transition:border-color 0.3s;
  display:flex;flex-direction:column;gap:14px;
}
.feed-card:hover{border-top-color:var(--laranja);}
.fstars{color:var(--laranja);letter-spacing:2px;font-size:13px;}
.ftexto{
  font-family:'Cormorant Garamond',serif;
  font-size:16px;font-style:italic;color:rgba(245,240,224,0.78);line-height:1.75;flex:1;
}
.fautor{display:flex;align-items:center;gap:10px;}
.fav{
  width:34px;height:34px;border-radius:50%;background:var(--v3);
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:600;color:var(--creme);flex-shrink:0;
}
.fnome{font-size:12px;font-weight:600;color:var(--creme);}
.fdet{font-size:11px;font-weight:300;color:rgba(245,240,224,0.4);}

/* ══ OFERTA ══ */
.oferta{background:var(--v2);padding:88px 24px;text-align:center;position:relative;overflow:hidden;}
.oferta::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(232,147,74,0.05) 0%,transparent 65%);
}
.oferta-box{
  background:rgba(10,31,14,0.8);border:1px solid var(--bl);
  padding:52px 44px;max-width:560px;margin:0 auto;
  position:relative;z-index:1;
}
.oferta-box::before,.oferta-box::after{
  content:'';position:absolute;width:18px;height:18px;
  border-color:var(--laranja);border-style:solid;
}
.oferta-box::before{top:-1px;left:-1px;border-width:2px 0 0 2px;}
.oferta-box::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}

.o-selo{
  display:inline-block;border:1px solid var(--bl);
  color:var(--laranja3);font-size:10px;letter-spacing:3px;text-transform:uppercase;
  padding:6px 16px;margin-bottom:20px;
}
.oferta-box h2{font-size:clamp(26px,4vw,46px);margin-bottom:24px;}

.preco-de{font-size:13px;color:rgba(245,240,224,0.2);text-decoration:line-through;letter-spacing:1px;margin-bottom:2px;}
.preco-por{
  font-family:'Cormorant Garamond',serif;
  font-size:104px;font-weight:700;line-height:1;color:var(--creme);
}
.preco-por sup{font-size:38px;vertical-align:top;margin-top:14px;display:inline-block;color:var(--laranja2);}

.preco-psico{
  margin:12px 0;
  font-family:'Cormorant Garamond',serif;
  font-size:16px;font-style:italic;color:var(--laranja3);line-height:1.6;
}

.card-vital{
  background:rgba(143,207,154,0.07);border:1px solid var(--bv);
  padding:12px 18px;margin:16px 0;
  display:flex;gap:10px;align-items:flex-start;text-align:left;
}
.card-vital span{font-size:18px;flex-shrink:0;}
.card-vital strong{font-size:13px;font-weight:600;color:var(--claro);display:block;margin-bottom:2px;}
.card-vital p{font-size:12px;font-weight:300;color:rgba(245,240,224,0.44);line-height:1.6;}

.odiv{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--bl),transparent);margin:18px 0;}

.oferta-itens{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:24px;text-align:left;}
.oferta-itens li{
  font-size:14px;color:rgba(245,240,224,0.7);
  display:flex;gap:10px;align-items:flex-start;line-height:1.5;font-weight:300;
}
.oferta-itens li::before{content:'✦';color:var(--laranja3);font-size:10px;flex-shrink:0;margin-top:3px;}

.fmini{margin-bottom:20px;text-align:left;}
.fmstep{display:flex;gap:8px;align-items:flex-start;margin-bottom:7px;font-size:13px;font-weight:300;color:rgba(245,240,224,0.52);line-height:1.6;}
.fmn{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;color:var(--laranja3);flex-shrink:0;line-height:1.4;}
.fmstep strong{color:var(--creme);font-weight:600;}

.garantia{
  background:rgba(143,207,154,0.06);border:1px solid var(--bv);
  padding:12px 16px;margin-top:12px;
  display:flex;gap:10px;align-items:flex-start;text-align:left;
}
.garantia span{font-size:16px;flex-shrink:0;}
.garantia strong{font-size:13px;font-weight:600;color:var(--creme);display:block;margin-bottom:2px;}
.garantia p{font-size:12px;font-weight:300;color:rgba(245,240,224,0.4);line-height:1.6;}

/* ══ ENCERRAMENTO ══ */
.enc{background:var(--v1);padding:80px 24px;text-align:center;}
.enc h2{font-size:clamp(26px,5vw,56px);margin-bottom:14px;}
.enc p{font-size:15px;font-weight:300;color:rgba(245,240,224,0.48);max-width:400px;margin:0 auto 36px;line-height:1.9;}
.enc p strong{color:var(--creme);font-weight:500;}

/* ══ FOOTER ══ */
footer{
  background:var(--preto);border-top:1px solid rgba(255,255,255,0.04);
  padding:28px 24px;text-align:center;
  font-size:11px;color:rgba(245,240,224,0.13);letter-spacing:0.3px;line-height:2.4;
}
.fl{font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;color:rgba(245,240,224,0.2);display:block;margin-bottom:10px;}

/* ══ ANIMATE ══ */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.reveal{opacity:0;transform:translateY(32px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}

/* ══ MOBILE ══ */
@media(max-width:768px){
  nav{padding:14px 20px;}
  .hero-preco{flex-direction:column;gap:8px;text-align:center;}
  .hero-preco .info{text-align:center;}
  .fluxo-steps::before{display:none;}
  .oferta-box{padding:36px 22px;}
  .preco-por{font-size:80px;}
  .btn-lg{padding:16px 40px;}
}
@media(max-width:480px){
  .preco-por{font-size:68px;}
  .compare{gap:1px;}
  .ci{min-width:120px;padding:14px 16px;}
}
</style>
</head>
<body>

<!-- CTA FLUTUANTE -->
<div class="cta-float">
  <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn-float">Quero meu guia — R$37,00</a>
  <small>Pagamento único · Acesso vitalício</small>
</div>

<!-- NAV -->
<nav>
  <div class="nav-logo">Seu <span>Nutricionista</span></div>
  <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn">Quero meu guia — R$37,00</a>
</nav>

<!-- ══ HERO ══ -->
<section class="hero" style="background-image:url(https://raw.githubusercontent.com/giulliasz/guia-nutricional/main/pexels-wolfart-32383599.jpg);background-size:cover;background-position:center;">
  <div style="position:absolute;inset:0;background:rgba(8,20,10,0.72);z-index:0;"></div>
  <div class="hero-badge">Protocolo Nutricional Exclusivo</div>
  <h1>
    <span class="l1">Guia</span>
    <span class="l2">Nutricional</span>
    <span class="l3">Personalizado para o seu objetivo</span>
  </h1>
  <div class="hero-div"></div>
  <p class="hero-sub">
    Chega de tentativas que não funcionam.<br>
    <strong>Seu corpo merece um plano feito para ele.</strong><br>
    Sua rotina. Seu objetivo. Do jeito que só você vive.
  </p>
  <div class="hero-preco">
    <div class="val"><sup>R$</sup>37,00</div>
    <div class="info">
      <strong>Investimento único · Acesso vitalício</strong>
      <span>Um investimento tão baixo<br>que serve para você.</span>
    </div>
  </div>
  <div class="hero-cta">
    <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn btn-lg">Quero meu guia agora</a>
    <small>Pague · Responda · Baixe seu PDF na hora</small>
  </div>
  <div class="food-strip">
    <div class="food-pill"><span>🥑</span> Gorduras boas</div>
    <div class="food-pill"><span>🥦</span> Micronutrientes</div>
    <div class="food-pill"><span>🍗</span> Proteína</div>
    <div class="food-pill"><span>🌿</span> Equilíbrio</div>
    <div class="food-pill"><span>🍋</span> Vitaminas</div>
    <div class="food-pill"><span>🥗</span> Plano real</div>
  </div>
</section>

<!-- FAIXA -->
<div class="faixa">
  ✦ <u>R$37 — menos do que um delivery. Menos do que um plano de R$300. O mesmo resultado.</u> ✦
</div>



<!-- ══ VÍDEO — 2ª dobra ══ -->
<section class="video-sec reveal">
  <div class="c">
    <div class="tag-s">Prova social</div>
    <h2>Você não precisa apenas de<br><em>academia para evoluir.</em></h2>
    <p class="vsub" style="margin-top:8px;">O método certo transforma qualquer ambiente em resultado.</p>
  </div>
  <div style="max-width:380px;margin:0 auto 24px;">
    <div style="padding:177.78% 0 0 0;position:relative;border-radius:16px;overflow:hidden;">
      <iframe src="https://www.youtube.com/embed/Il2owZD5Wds?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=Il2owZD5Wds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
    </div>
  </div>
  
</section>

<!-- ══ R$37 DESTAQUE ══ -->
<section class="vinte reveal">
  <div class="vinte-inner">
    <div class="tag-s" style="color:var(--laranja3);">Pense por um segundo</div>
    <p class="vinte-hl"><em>R$37.</em> Um investimento<br>tão baixo que serve para você.</p>
    <p class="vinte-sub">
      Por menos do que um delivery que te deixa culpado.<br>
      Por menos do que uma consulta que custa R$300 e você faz uma vez.<br>
      Por menos do que aquilo que some da sua carteira<br>toda semana sem você nem perceber.<br><br>
      <strong style="color:var(--laranja2);font-style:normal;">Por que pagar R$300 por um plano se você tem tudo aqui por R$37?</strong>
    </p>
    <div class="compare">
      <div class="ci"><span class="ic">🛵</span><span class="vl">R$45</span><p class="dc">Delivery que some em 20 min</p></div>
      <div class="ci"><span class="ic">🍔</span><span class="vl">R$28</span><p class="dc">Lanche que piora seu corpo</p></div>
      <div class="ci"><span class="ic">☕</span><span class="vl">R$22</span><p class="dc">Café com bolo na padaria</p></div>
      <div class="ci hl"><span class="ic">📋</span><span class="vl">R$37,00</span><p class="dc">Seu guia nutricional + treino · vitalício</p></div>
    </div>
    <div class="vitalicio">
      <span class="vi">♾️</span>
      <div>
        <strong>Acesso vitalício ao seu PDF personalizado</strong>
        <p>Você paga uma vez e tem acesso para sempre. Gerado exclusivamente para você — ninguém recebe igual.</p>
      </div>
    </div>
    <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn btn-lg">Quero investir em mim — R$37,00</a>
  </div>
</section>

<!-- ══ DOR ══ -->
<section class="dor reveal">
  <div class="cw">
    <div class="tag-s">Você se reconhece aqui?</div>
    <h2 class="dk" style="font-size:clamp(26px,4.5vw,50px);text-align:center;margin-bottom:0;">Já tentou.<br><em>Mais de uma vez.</em></h2>
    <div class="dor-grid">
      <div class="dor-card"><span class="di">😤</span><p>Começou animado e desistiu em poucos dias <strong>sem entender o porquê.</strong></p></div>
      <div class="dor-card"><span class="di">🔄</span><p>Seguiu tudo certinho e o corpo <strong>simplesmente não respondeu.</strong></p></div>
      <div class="dor-card"><span class="di">📱</span><p>Testou apps e planos prontos que <strong>não foram feitos pra você.</strong></p></div>
      <div class="dor-card"><span class="di">🌀</span><p>A internet diz coisas diferentes todo dia e <strong>você não sabe mais em quem confiar.</strong></p></div>
    </div>
    <div class="dor-virada">
      O problema nunca foi você. Foi a falta de um plano que respeitasse quem você realmente é.
    </div>
  </div>
</section>

<!-- ══ CONTROLE ══ -->
<section class="controle reveal">
  <div class="controle-inner">
    <div class="tag-s" style="color:var(--laranja3);">Liberdade real</div>
    <h2>Você faz de onde<br><em>estiver.</em> Você tem controle.</h2>
    <p>No trabalho, em casa, viajando.<br><strong>O guia é seu. No seu celular. Para sempre.</strong><br>Sem academia obrigatória. Sem horário fixo.</p>
    <div class="ctrl-tags">
      <div class="ctrl-tag"><span>📍</span> De qualquer lugar</div>
      <div class="ctrl-tag"><span>📱</span> No seu celular</div>
      <div class="ctrl-tag"><span>⏱️</span> No seu ritmo</div>
      <div class="ctrl-tag"><span>♾️</span> Para sempre</div>
      <div class="ctrl-tag"><span>🎯</span> Para o seu objetivo</div>
    </div>
    <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn btn-lg">Quero ter esse controle — R$37,00</a>
  </div>
</section>

<!-- ══ RECEBE ══ -->
<section class="recebe reveal">
  <div class="cw">
    <div class="tag-s" style="color:var(--laranja3);">O que está incluso</div>
    <h2 class="dk" style="font-size:clamp(24px,4vw,46px);text-align:center;margin-bottom:36px;">Tudo que você precisa.<br><em>Nada que não vai usar.</em></h2>
    <div class="recebe-grid">
      <div class="recebe-item"><div class="rn">01</div><div><h3>Plano alimentar personalizado</h3><p>Baseado no seu objetivo real. Nada genérico.</p></div></div>
      <div class="recebe-item"><div class="rn">02</div><div><h3>Treino adaptado ao seu objetivo</h3><p>Para o que você quer alcançar, no tempo que você tem.</p></div></div>
      <div class="recebe-item"><div class="rn">03</div><div><h3>Estratégia para a sua rotina</h3><p>Funciona junto com a sua vida real.</p></div></div>
      <div class="recebe-item"><div class="rn">04</div><div><h3>Substituições inteligentes</h3><p>Restaurante, viagem, dia corrido — você sempre vai saber o que fazer.</p></div></div>
      <div class="recebe-item"><div class="rn">05</div><div><h3>Linguagem simples e direta</h3><p>Você lê e já sabe o que fazer. Sem enrolação.</p></div></div>
      <div class="recebe-item"><div class="rn">06</div><div><h3>Suporte por 7 dias</h3><p>Dúvida na aplicação? Tem suporte real.</p></div></div>
    </div>
  </div>
</section>

<!-- ══ COMO FUNCIONA ══ -->
<section class="fluxo reveal">
  <div class="cw">
    <div class="tag-s" style="color:var(--laranja3);">Como funciona</div>
    <h2 class="dk" style="font-size:clamp(24px,4vw,46px);text-align:center;">Três passos.<br><em>Simples assim.</em></h2>
    <div class="fluxo-steps">
      <div class="fstep"><div class="fsn">1</div><h3>Pague R$37</h3><p>Pagamento único e seguro. Cartão ou PIX.</p></div>
      <div class="fstep"><div class="fsn">2</div><h3>Responda o questionário</h3><p>Suas respostas moldam o guia para a sua realidade.</p></div>
      <div class="fstep"><div class="fsn">3</div><h3>Baixe seu PDF</h3><p>Botão ao final. Acesso na hora. Vitalício.</p></div>
    </div>
  </div>
</section>


<!-- ══ GALERIA ══ -->
<section style="background:var(--v1);padding:0 0 80px;">
  <div style="max-width:1020px;margin:0 auto;padding:0 24px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:4px;">
      <div style="overflow:hidden;aspect-ratio:4/5;position:relative;">
        <img src="https://raw.githubusercontent.com/giulliasz/guia-nutricional/main/trudee-wiltshire-dupe.jpeg" alt="Alimentação saudável" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"/>
      </div>
      <div style="overflow:hidden;aspect-ratio:4/5;position:relative;">
        <img src="https://raw.githubusercontent.com/giulliasz/guia-nutricional/main/bheatriz-siqueira-dupe.jpeg" alt="Resultado real" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"/>
      </div>
      <div style="overflow:hidden;aspect-ratio:4/5;position:relative;">
        <img src="https://raw.githubusercontent.com/giulliasz/guia-nutricional/main/alina-valentina-dupe.jpeg" alt="Resultado real" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"/>
      </div>
    </div>
    <p style="text-align:center;font-family:'Cormorant Garamond',serif;font-size:clamp(16px,2.5vw,22px);font-style:italic;color:rgba(245,240,224,0.5);margin-top:24px;line-height:1.6;">
      Escolhas simples. Consistência real. <em style="color:var(--laranja3);">Resultado que aparece.</em>
    </p>
  </div>
</section>

<!-- ══ PROVA SOCIAL ══ -->
<section style="background:var(--v2);padding:48px 24px;text-align:center;" class="reveal">
  <div style="max-width:720px;margin:0 auto;">
    <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(232,147,74,0.08);border:1px solid var(--bl);padding:14px 28px;margin-bottom:20px;">
      <span style="font-size:20px;">🔥</span>
      <span style="font-size:13px;font-weight:600;color:var(--laranja3);letter-spacing:1px;">ALTA PROCURA — ÚLTIMAS HORAS COM ESSE PREÇO</span>
    </div>
    <p style="font-family:'Cormorant Garamond',serif;font-size:clamp(18px,3vw,28px);font-style:italic;color:var(--creme);line-height:1.6;margin-bottom:16px;">
      Mais de <strong style="color:var(--laranja2);font-style:normal;">pessoas reais</strong> já receberam<br>o guia e estão aplicando agora.
    </p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px;margin-top:20px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:22px;">✅</span>
        <span style="font-size:13px;font-weight:300;color:rgba(245,240,224,0.6);">Entrega imediata após o pagamento</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:22px;">🛡️</span>
        <span style="font-size:13px;font-weight:300;color:rgba(245,240,224,0.6);">7 dias de garantia total</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:22px;">♾️</span>
        <span style="font-size:13px;font-weight:300;color:rgba(245,240,224,0.6);">Acesso vitalício ao seu PDF</span>
      </div>
    </div>
  </div>
</section>

<!-- ══ FEEDBACKS ══ -->
<section class="feed reveal">
  <div class="cw">
    <div class="tag-s" style="color:var(--laranja3);">Feedbacks</div>
    <h2 class="dk" style="font-size:clamp(24px,4vw,44px);text-align:center;margin-bottom:44px;">Quem recebeu o guia,<br><em>sentiu a diferença.</em></h2>
    <div class="feed-grid">
      <div class="feed-card">
        <div class="fstars">★★★★★</div>
        <p class="ftexto">"Nunca tinha conseguido manter uma alimentação saudável por mais de uma semana. Com o guia entendi onde errava. Três semanas depois já me sinto diferente."</p>
        <div class="fautor"><div class="fav">F</div><div><div class="fnome">Fernanda S.</div><div class="fdet">28 anos · Emagrecimento</div></div></div>
      </div>
      <div class="feed-card">
        <div class="fstars">★★★★★</div>
        <p class="ftexto">"Meses tentando ganhar massa sem resultado. O guia mostrou exatamente onde eu errava. Simples, direto, funciona."</p>
        <div class="fautor"><div class="fav">R</div><div><div class="fnome">Rafael M.</div><div class="fdet">32 anos · Ganho de massa</div></div></div>
      </div>
      <div class="feed-card">
        <div class="fstars">★★★★★</div>
        <p class="ftexto">"R$37. Achei que era barato demais pra funcionar. Errei feio. É o melhor investimento que fiz na minha saúde nos últimos anos."</p>
        <div class="fautor"><div class="fav">J</div><div><div class="fnome">Juliana T.</div><div class="fdet">35 anos · Equilíbrio</div></div></div>
      </div>
    </div>
  </div>
</section>

<!-- ══ OFERTA ══ -->
<section class="oferta reveal">
  <div class="oferta-box">
    <div class="o-selo">Pagamento único · Acesso vitalício</div>
    <h2 class="dk">Seu plano.<br><em>Agora.</em></h2>
    <div class="preco-de">de R$ 97,00</div>
    <div class="preco-por"><sup>R$</sup>37,00</div>
    <p class="preco-psico">
      Menos do que um delivery.<br>
      Menos do que um lanche que piora seu corpo.<br>
      <strong style="color:var(--laranja2);font-style:normal;">Um investimento que fica com você para sempre.</strong>
    </p>
    <div class="card-vital">
      <span>♾️</span>
      <div>
        <strong>Acesso vitalício ao seu PDF</strong>
        <p>Paga uma vez. Acessa para sempre. Gerado exclusivamente para você.</p>
      </div>
    </div>
    <div class="odiv"></div>
    <ul class="oferta-itens">
      <li>Plano alimentar 100% personalizado (PDF)</li>
      <li>Treino adaptado ao seu objetivo</li>
      <li>Estratégia para a sua rotina real</li>
      <li>Substituições inteligentes para qualquer situação</li>
      <li>Suporte por 7 dias</li>
      <li>Acesso vitalício — paga uma vez, é seu para sempre</li>
    </ul>
    <div class="fmini">
      <div class="fmstep"><span class="fmn">1.</span><p><strong>Pague</strong> com segurança</p></div>
      <div class="fmstep"><span class="fmn">2.</span><p><strong>Responda</strong> o questionário</p></div>
      <div class="fmstep"><span class="fmn">3.</span><p><strong>Baixe seu PDF</strong> no botão final</p></div>
    </div>
    <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn btn-full">Quero meu guia personalizado — R$37,00</a>
    <p style="margin-top:8px;font-size:11px;color:rgba(245,240,224,0.2);text-align:center;letter-spacing:1.5px;text-transform:uppercase;">Pagamento único · Acesso vitalício</p>
    <div class="garantia">
      <span>🛡️</span>
      <div>
        <strong>7 dias de garantia total</strong>
        <p>Não ficou satisfeito? Reembolso em até 7 dias. Sem perguntas, sem burocracia. O risco é zero.</p>
      </div>
    </div>
  </div>
</section>

<!-- ══ ENCERRAMENTO ══ -->
<section class="enc reveal">
  <div class="c">
    <h2 class="dk" style="font-size:clamp(26px,5vw,54px);">Consistência.<br>Escolhas simples.<br><em>Mudança possível.</em></h2>
    <p>Nenhuma transformação começa com perfeição.<br>Começa com <strong>uma decisão de R$37, tomada agora.</strong></p>
    <a href="https://pay.kiwify.com.br/y8GYnfg" class="btn btn-lg">Quero meu guia por R$37,00</a>
  </div>
</section>

<footer>
  <span class="fl">Seu Nutricionista</span>
  © 2025 · Todos os direitos reservados<br>
  Material informativo e educativo · Não substitui acompanhamento médico ou nutricional clínico<br>
  <span style="margin-top:8px;display:inline-block;">
    <a href="/termos" style="color:rgba(245,240,224,0.3);text-decoration:none;" target="_blank">Termos de Uso</a>
    &nbsp;·&nbsp;
    <a href="/privacidade" style="color:rgba(245,240,224,0.3);text-decoration:none;" target="_blank">Política de Privacidade</a>
  </span><br>
  <span style="margin-top:6px;display:inline-block;font-size:11px;color:rgba(245,240,224,0.2);">
    ✉ <a href="/cdn-cgi/l/email-protection#a4d7c1d1cad1d0d6cdc7cdcbcacdd7d0c59591e4c3c9c5cdc88ac7cbc9" style="color:rgba(245,240,224,0.2);text-decoration:none;"><span class="__cf_email__" data-cfemail="d0a3b5a5bea5a4a2b9b3b9bfbeb9a3a4b1e1e590b7bdb1b9bcfeb3bfbd">[email&#160;protected]</span></a>
  </span>
</footer>

<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
},{threshold:0.07});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
</script>

<!-- ══ CHAT FLUTUANTE ══ -->
<style>
.chat-float-btn {
  position: fixed;
  bottom: 90px;
  right: 24px;
  z-index: 300;
  background: var(--laranja);
  color: var(--v1);
  width: 56px; height: 56px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(232,147,74,0.5);
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
}
.chat-float-btn:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(232,147,74,0.65); }

.chat-float-label {
  position: fixed;
  bottom: 152px;
  right: 20px;
  z-index: 300;
  background: var(--v1);
  border: 1px solid var(--bl);
  color: rgba(245,240,224,0.7);
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding: 5px 10px;
  white-space: nowrap;
  pointer-events: none;
}

.chat-window {
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: min(380px, calc(100vw - 32px));
  height: 520px;
  z-index: 301;
  background: #0d1a0f;
  border: 1px solid rgba(232,147,74,0.2);
  display: none;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  border-radius: 4px;
  overflow: hidden;
}

.chat-window.open { display: flex; }

.chat-header {
  background: var(--v3);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(232,147,74,0.15);
  flex-shrink: 0;
}

.chat-header-av {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--laranja);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}

.chat-header-info h4 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px; font-weight: 600;
  color: var(--creme); margin-bottom: 1px;
}

.chat-header-info span {
  font-size: 10px; color: #4ade80;
  letter-spacing: 1px;
}

.chat-close {
  margin-left: auto;
  background: none; border: none;
  color: rgba(245,240,224,0.4);
  font-size: 20px; cursor: pointer;
  line-height: 1;
}
.chat-close:hover { color: var(--creme); }

.chat-msgs {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-msgs::-webkit-scrollbar { width: 3px; }
.chat-msgs::-webkit-scrollbar-thumb { background: rgba(232,147,74,0.2); }

.cmsg {
  display: flex; gap: 8px; align-items: flex-end;
  animation: fadeUp 0.3s ease both;
}

.cmsg.user { flex-direction: row-reverse; }

.cmsg-av {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; flex-shrink: 0;
}

.cmsg.bot .cmsg-av { background: var(--v3); }
.cmsg.user .cmsg-av { background: rgba(232,147,74,0.2); border: 1px solid var(--bl); }

.cmsg-bubble {
  max-width: 80%;
  padding: 10px 14px;
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.6;
}

.cmsg.bot .cmsg-bubble {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  color: rgba(245,240,224,0.85);
  border-radius: 2px 10px 10px 2px;
}

.cmsg.user .cmsg-bubble {
  background: var(--v3);
  color: var(--creme);
  border-radius: 10px 2px 2px 10px;
}

.chat-typing {
  display: none;
  gap: 8px; align-items: flex-end;
}
.chat-typing.show { display: flex; }
.chat-typing-bubble {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 12px 16px;
  border-radius: 2px 10px 10px 2px;
  display: flex; gap: 4px;
}
.chat-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--laranja2);
  animation: typingDot 1.2s ease-in-out infinite;
}
.chat-dot:nth-child(2) { animation-delay: 0.2s; }
.chat-dot:nth-child(3) { animation-delay: 0.4s; }

.chat-sugs {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 0 16px 8px;
  flex-shrink: 0;
}

.chat-sug {
  background: transparent;
  border: 1px solid rgba(232,147,74,0.2);
  color: rgba(245,240,224,0.55);
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  padding: 5px 12px;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s;
  white-space: nowrap;
}
.chat-sug:hover { border-color: var(--laranja); color: var(--laranja3); }

.chat-input-row {
  display: flex; gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}

.chat-input {
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--creme);
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  padding: 10px 14px;
  outline: none;
  resize: none;
  min-height: 42px; max-height: 80px;
  line-height: 1.5;
  border-radius: 2px;
}
.chat-input::placeholder { color: rgba(245,240,224,0.25); }
.chat-input:focus { border-color: rgba(232,147,74,0.3); }

.chat-send {
  width: 42px; height: 42px;
  background: var(--laranja);
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; color: var(--v1);
  flex-shrink: 0;
  transition: background 0.2s;
  border-radius: 2px;
}
.chat-send:hover { background: var(--laranja2); }
.chat-send:disabled { background: #333; cursor: not-allowed; opacity: 0.4; }

@keyframes typingDot {
  0%,60%,100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-5px); opacity: 1; }
}
</style>

<!-- Label -->
<div class="chat-float-label">Precisa de ajuda? 💬</div>

<!-- Botão flutuante -->
<button class="chat-float-btn" onclick="toggleChat()" id="chatBtn">💬</button>

<!-- Janela do chat -->
<div class="chat-window" id="chatWindow">
  <div class="chat-header">
    <div class="chat-header-av">🥗</div>
    <div class="chat-header-info">
      <h4>Suporte Nutricional</h4>
      <span>● Online agora</span>
    </div>
    <button class="chat-close" onclick="toggleChat()">×</button>
  </div>

  <div class="chat-msgs" id="chatMsgs">
    <div class="cmsg bot">
      <div class="cmsg-av">🥗</div>
      <div class="cmsg-bubble">Olá! 👋 Pode me perguntar qualquer coisa sobre o guia nutricional. Estou aqui para ajudar!</div>
    </div>
  </div>

  <div class="chat-typing" id="chatTyping">
    <div class="cmsg-av" style="width:28px;height:28px;border-radius:50%;background:var(--v3);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">🥗</div>
    <div class="chat-typing-bubble">
      <div class="chat-dot"></div>
      <div class="chat-dot"></div>
      <div class="chat-dot"></div>
    </div>
  </div>

  <div class="chat-sugs" id="chatSugs">
    <button class="chat-sug" onclick="usarSug(this)">O que está incluso?</button>
    <button class="chat-sug" onclick="usarSug(this)">Como recebo o PDF?</button>
    <button class="chat-sug" onclick="usarSug(this)">Tem garantia?</button>
    <button class="chat-sug" onclick="usarSug(this)">Vale para emagrecer?</button>
  </div>

  <div class="chat-input-row">
    <textarea class="chat-input" id="chatInput" placeholder="Digite sua dúvida..." rows="1"
      onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();enviarChat()}"
      oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px'"></textarea>
    <button class="chat-send" id="chatSend" onclick="enviarChat()">➤</button>
  </div>
</div>

<script>
var chatHistorico = [];
var chatEnviando = false;
var chatAberto = false;

var CHAT_SYSTEM = "Você é o assistente de suporte do Guia Nutricional Personalizado. Responda em português brasileiro, de forma simples, humana e acolhedora. Seja direto e objetivo — respostas curtas de 2 a 4 linhas. O produto é um guia nutricional + treino em PDF por R$37,00, personalizado com base num questionário. A pessoa paga, responde o questionário e baixa o PDF na hora. Tem 7 dias de garantia. Nunca prometa resultados específicos. Se a pergunta for muito clínica, oriente a buscar um profissional.";

function toggleChat() {
  chatAberto = !chatAberto;
  document.getElementById('chatWindow').classList.toggle('open', chatAberto);
  document.getElementById('chatBtn').textContent = chatAberto ? '×' : '💬';
  if (chatAberto) document.getElementById('chatInput').focus();
}

function addChatMsg(role, text) {
  var msgs = document.getElementById('chatMsgs');
  var div = document.createElement('div');
  div.className = 'cmsg ' + role;
  div.innerHTML = (role === 'bot' ? '<div class="cmsg-av">🥗</div>' : '<div class="cmsg-av">👤</div>') +
    '<div class="cmsg-bubble">' + text.replace(/\\n/g,'<br>') + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping(show) {
  document.getElementById('chatTyping').className = 'chat-typing' + (show ? ' show' : '');
  if (show) document.getElementById('chatMsgs').scrollTop = 99999;
}

async function enviarChat() {
  var input = document.getElementById('chatInput');
  var texto = input.value.trim();
  if (!texto || chatEnviando) return;

  document.getElementById('chatSugs').style.display = 'none';
  input.value = '';
  input.style.height = 'auto';
  addChatMsg('user', texto);
  chatHistorico.push({role:'user', content:texto});

  chatEnviando = true;
  document.getElementById('chatSend').disabled = true;
  showTyping(true);

  try {
    var res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: CHAT_SYSTEM,
        messages: chatHistorico
      })
    });
    var data = await res.json();
    var resposta = data.content && data.content[0] ? data.content[0].text : 'Desculpe, tive um problema. Tente novamente!';
    chatHistorico.push({role:'assistant', content:resposta});
    showTyping(false);
    addChatMsg('bot', resposta);
  } catch(e) {
    showTyping(false);
    addChatMsg('bot', 'Ops, problema de conexão. Tente novamente em instantes! 🙏');
  }

  chatEnviando = false;
  document.getElementById('chatSend').disabled = false;
}

function usarSug(btn) {
  document.getElementById('chatInput').value = btn.textContent;
  enviarChat();
}
</script>


<!-- ══ POPUP CAPTURA DE LEADS ══ -->
<style>
.popup-overlay{
  position:fixed;inset:0;background:rgba(5,14,6,0.88);
  z-index:500;display:none;align-items:center;justify-content:center;
  padding:24px;backdrop-filter:blur(4px);
}
.popup-overlay.show{display:flex;}

.popup-box{
  background:var(--v2);border:1px solid var(--bl);
  padding:44px 36px;max-width:480px;width:100%;
  text-align:center;position:relative;
  animation:fadeUp 0.4s ease both;
}
.popup-box::before,.popup-box::after{
  content:'';position:absolute;width:16px;height:16px;
  border-color:var(--laranja);border-style:solid;
}
.popup-box::before{top:-1px;left:-1px;border-width:2px 0 0 2px;}
.popup-box::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}

.popup-emoji{font-size:40px;margin-bottom:12px;display:block;}

.popup-tag{
  display:inline-block;border:1px solid var(--bl);
  color:var(--laranja3);font-size:10px;letter-spacing:3px;text-transform:uppercase;
  padding:5px 14px;margin-bottom:16px;
}

.popup-box h2{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(22px,4vw,32px);font-weight:700;line-height:1.15;
  color:var(--creme);margin-bottom:12px;
}
.popup-box h2 em{font-style:italic;color:var(--laranja2);}

.popup-box p{
  font-size:14px;font-weight:300;
  color:rgba(245,240,224,0.6);line-height:1.75;margin-bottom:28px;
}
.popup-box p strong{color:var(--creme);font-weight:600;}

.popup-btns{display:flex;gap:10px;flex-direction:column;}

.popup-sim{
  display:block;background:var(--v3);border:1px solid rgba(143,207,154,0.25);
  color:var(--creme);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:600;font-size:14px;
  letter-spacing:1px;padding:16px;text-align:center;
  transition:background 0.2s,transform 0.2s;cursor:pointer;border:none;width:100%;
}
.popup-sim:hover{background:#2d6a35;transform:translateY(-2px);}

.popup-nao{
  display:block;background:transparent;
  border:1px solid rgba(245,240,224,0.1);
  color:rgba(245,240,224,0.4);text-decoration:none;
  font-family:'Jost',sans-serif;font-weight:400;font-size:13px;
  letter-spacing:1px;padding:14px;text-align:center;
  transition:all 0.2s;cursor:pointer;width:100%;
}
.popup-nao:hover{border-color:rgba(245,240,224,0.2);color:rgba(245,240,224,0.6);}

.popup-close{
  position:absolute;top:12px;right:16px;
  background:none;border:none;color:rgba(245,240,224,0.3);
  font-size:20px;cursor:pointer;line-height:1;
}
.popup-close:hover{color:var(--creme);}
</style>

<div class="popup-overlay" id="leadPopup">
  <div class="popup-box">
    <button class="popup-close" onclick="fecharPopup()">×</button>
    <span class="popup-emoji">🥗</span>
    <div class="popup-tag">Presente para você</div>
    <h2>Quer um Guia de Receitas<br><em>Rápidas de graça?</em></h2>
    <p>
      Antes de seguir para o pagamento, que tal levar um <strong>Guia de Receitas Práticas de até 15 minutos</strong> completamente gratuito?<br>
      É só preencher um formulário rápido.
    </p>
    <div class="popup-btns">
      <button class="popup-sim" onclick="irParaForms()">🎁 Sim, quero o guia grátis!</button>
      <button class="popup-nao" onclick="irParaPagamento()">Não, obrigado — seguir para o pagamento</button>
    </div>
  </div>
</div>

<script>
function abrirPopup(e){
  e.preventDefault();
  document.getElementById('leadPopup').classList.add('show');
}

function fecharPopup(){
  var popup = document.getElementById('leadPopup');
  if(popup) popup.classList.remove('show');
}

function irParaForms(){
  fecharPopup();
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSd2LCxRtbzcjeteA3w7EB6yT5WYtLNOoH9zY_eBkawZJ-A03w/viewform', '_blank');
}

function irParaPagamento(){
  fecharPopup();
  window.location.href = 'https://pay.kiwify.com.br/y8GYnfg';
}

// Intercepta TODOS os botões principais da página
function initPopup(){
  document.querySelectorAll('a[href="https://pay.kiwify.com.br/y8GYnfg"]').forEach(function(btn){
    btn.removeEventLi` }} />
  );
}
