import { useState } from "react";

const G = {
  bg: "#0d1a0a",
  accent: "#7fc235",
  accentDk: "#4e8a10",
  text: "#f0ede8",
  muted: "rgba(240,237,232,0.38)",
  border: "rgba(255,255,255,0.08)",
};

const inp = {
  width: "100%", padding: "11px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1.5px solid rgba(255,255,255,0.08)",
  borderRadius: "9px", color: "#f0ede8",
  fontSize: "14px", outline: "none",
  fontFamily: "inherit", boxSizing: "border-box", lineHeight: "1.5",
};

function F({ label, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", color: "#90be50", fontSize: "11px", fontWeight: "700", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: "6px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
const Inp = ({ v, onChange, ph, type = "text" }) => (
  <input type={type} value={v} onChange={e => onChange(e.target.value)} placeholder={ph} style={inp} />
);
const Sel = ({ v, onChange, opts }) => (
  <select value={v} onChange={e => onChange(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
    <option value="">Selecione...</option>
    {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
  </select>
);
const Txt = ({ v, onChange, ph, rows = 3 }) => (
  <textarea value={v} onChange={e => onChange(e.target.value)} placeholder={ph} rows={rows}
    style={{ ...inp, resize: "vertical", lineHeight: "1.6" }} />
);

// ── PDF ──────────────────────────────────────────────────────────────────
function abrirPDF(conteudo, d) {
  const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8">
<title>Guia Nutricional – ${d.nome}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#fff;color:#222;font-size:13px;line-height:1.75}
.capa{background:linear-gradient(160deg,#142b0c 0%,#1c3d10 45%,#0e2008 100%);min-height:100vh;display:flex;flex-direction:column;page-break-after:always;position:relative;overflow:hidden}
.capa::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 80% 20%,rgba(127,194,53,.12) 0%,transparent 60%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(80,140,20,.09) 0%,transparent 60%)}
.capa-corpo{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 64px 48px;text-align:center;position:relative}
.capa-tag{display:inline-block;border:1px solid rgba(127,194,53,.4);color:rgba(180,230,100,.8);font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;padding:6px 18px;border-radius:100px;margin-bottom:36px}
.capa h1{font-family:'Playfair Display',serif;font-size:58px;font-weight:700;color:#f4f1ea;line-height:1.08;letter-spacing:-.02em;margin-bottom:10px}
.capa h1 em{font-style:italic;color:#a8d85a}
.capa-sub{font-size:12px;color:rgba(244,241,234,.4);letter-spacing:.2em;text-transform:uppercase;margin-bottom:52px;font-weight:500}
.capa-sep{width:48px;height:1.5px;background:linear-gradient(90deg,transparent,#7fc235,transparent);margin:0 auto 36px}
.capa-para{font-family:'Playfair Display',serif;font-size:11px;color:rgba(244,241,234,.38);letter-spacing:.16em;text-transform:uppercase;margin-bottom:8px}
.capa-nome{font-family:'Playfair Display',serif;font-size:32px;font-style:italic;color:#c5e880;font-weight:500}
.capa-stats{display:flex;gap:48px;justify-content:center;margin-top:44px}
.capa-stat .val{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#f4f1ea}
.capa-stat .key{font-size:9px;color:rgba(244,241,234,.32);text-transform:uppercase;letter-spacing:.15em;margin-top:2px}
.capa-rodape{background:rgba(0,0,0,.28);padding:16px 64px;display:flex;justify-content:space-between;position:relative}
.capa-rodape span{font-size:10px;color:rgba(244,241,234,.28);letter-spacing:.08em}
.pagina{padding:56px 64px;max-width:840px;margin:0 auto}
.secao{margin-bottom:52px;page-break-inside:avoid}
.secao-topo{display:flex;align-items:baseline;gap:14px;margin-bottom:20px;padding-bottom:11px;border-bottom:1.5px solid #ddeec5}
.secao-num{font-size:10px;font-weight:700;color:#6aad20;letter-spacing:.18em;text-transform:uppercase}
.secao-titulo{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#152d08;letter-spacing:-.01em}
p{margin-bottom:11px;color:#333}
h3{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#254d0c;margin:20px 0 8px}
h4{font-size:12px;font-weight:700;color:#3a7010;text-transform:uppercase;letter-spacing:.1em;margin:16px 0 6px}
ul,ol{padding-left:20px;margin-bottom:10px}
li{margin-bottom:5px;color:#333}
strong{color:#1a3808}
.box{background:#f2f9e8;border-left:3px solid #7fc235;padding:14px 18px;border-radius:0 8px 8px 0;margin:14px 0}
.macros{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}
.macro{background:linear-gradient(135deg,#f3fae6,#eaf5d4);border:1px solid #cce89a;border-radius:10px;padding:14px 10px;text-align:center}
.macro .v{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#254d0c;line-height:1}
.macro .u{font-size:11px;color:#6aad20;font-weight:600;margin-top:1px}
.macro .l{font-size:10px;color:#89a870;text-transform:uppercase;letter-spacing:.09em;margin-top:4px}
.ref{border:1px solid #ddeec5;border-radius:11px;margin-bottom:14px;overflow:hidden;page-break-inside:avoid}
.ref-cab{background:#edf7dc;padding:11px 18px;display:flex;align-items:center;gap:10px}
.ref-icone{font-size:18px}
.ref-titulo{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#1a3808}
.ref-corpo{padding:14px 18px}
.ref-sub{font-size:10px;font-weight:700;color:#6aad20;text-transform:uppercase;letter-spacing:.1em;margin:10px 0 4px}
.tab{width:100%;border-collapse:collapse;font-size:12px;margin:14px 0}
.tab th{background:#1c3d10;color:#c5e880;padding:9px 10px;text-align:left;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.07em}
.tab td{padding:8px 10px;border-bottom:1px solid #e0edcc;vertical-align:top;color:#333}
.tab tr:nth-child(even) td{background:#f8fdf2}
.compras-bloco{margin-bottom:22px}
.compras-cat{font-size:10px;font-weight:700;color:#254d0c;text-transform:uppercase;letter-spacing:.14em;border-bottom:1.5px solid #c8e09a;padding-bottom:4px;margin-bottom:9px}
.compras-lista{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:4px 24px}
.compras-lista li{font-size:12.5px;color:#333;display:flex;align-items:center;gap:7px;padding:3px 0;border-bottom:1px dashed #ddeec5}
.compras-lista li::before{content:'';width:5px;height:5px;border-radius:50%;background:#7fc235;flex-shrink:0}
.treino-bloco{margin-bottom:24px}
.treino-tab{width:100%;border-collapse:collapse;font-size:12px;margin:10px 0}
.treino-tab th{background:#152d08;color:#b8e060;padding:9px 11px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
.treino-tab td{padding:8px 11px;border-bottom:1px solid #e0edcc;color:#333}
.treino-tab tr:nth-child(even) td{background:#f8fdf2}
.dica{display:flex;gap:13px;align-items:flex-start;padding:12px 15px;background:#f8fdf2;border-radius:9px;margin-bottom:9px;border:1px solid #ddeec5}
.dica-icone{font-size:19px;flex-shrink:0;margin-top:1px}
.dica-texto{font-size:13px;color:#333}
.dica-texto strong{color:#1a3808;display:block;margin-bottom:1px}
.resumo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0}
.resumo-card{background:#f2f9e8;border:1px solid #cce89a;border-radius:9px;padding:14px 16px}
.resumo-card .rc-label{font-size:9px;font-weight:700;color:#6aad20;text-transform:uppercase;letter-spacing:.12em;margin-bottom:4px}
.resumo-card .rc-val{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:#1a3808}
.resumo-card .rc-desc{font-size:11px;color:#5a7a40;margin-top:2px}
.regra{display:flex;gap:10px;align-items:flex-start;padding:10px 14px;background:#fff;border:1px solid #d8edba;border-radius:8px;margin-bottom:7px;font-size:12.5px;color:#333}
.regra-n{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#ddeec5;flex-shrink:0;line-height:1}
.final{background:linear-gradient(150deg,#152d08 0%,#1e4010 60%,#0e2008 100%);padding:72px 64px;text-align:center;page-break-before:always;position:relative}
.final-sep{width:40px;height:1.5px;background:linear-gradient(90deg,transparent,#7fc235,transparent);margin:0 auto 32px}
.final h2{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#f4f1ea;line-height:1.2;margin-bottom:28px}
.final p{max-width:520px;margin:0 auto 14px;color:rgba(244,241,234,.72);font-size:14.5px;line-height:1.9}
.final-ass{margin-top:48px;font-family:'Playfair Display',serif;font-size:21px;font-style:italic;color:#b8e060}
.final-cargo{font-size:10px;color:rgba(244,241,234,.3);letter-spacing:.16em;text-transform:uppercase;margin-top:5px}
@media print{.capa{page-break-after:always}.secao{page-break-inside:avoid}.final{page-break-before:always}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="capa">
  <div class="capa-corpo">
    <div class="capa-tag">Protocolo Nutricional Exclusivo</div>
    <h1>Guia<br><em>Nutricional</em></h1>
    <p class="capa-sub">Personalizado para o seu objetivo</p>
    <div class="capa-sep"></div>
    <p class="capa-para">Elaborado com exclusividade para</p>
    <div class="capa-nome">${d.nome}</div>
    <div class="capa-stats">
      ${d.idade ? `<div class="capa-stat"><div class="val">${d.idade}</div><div class="key">Anos</div></div>` : ""}
      ${d.peso ? `<div class="capa-stat"><div class="val">${d.peso}&thinsp;kg</div><div class="key">Peso</div></div>` : ""}
      ${d.altura ? `<div class="capa-stat"><div class="val">${d.altura}&thinsp;cm</div><div class="key">Altura</div></div>` : ""}
    </div>
  </div>
  <div class="capa-rodape">
    <span>Documento de uso pessoal e intransferível</span>
    <span>${hoje}</span>
  </div>
</div>
<div class="pagina">${conteudo}</div>
</body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 1400);
}

// ── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [etapa, setEtapa] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [conteudo, setConteudo] = useState(null);
  const [erro, setErro] = useState(null);

  const [f, setF] = useState({
    nome: "", idade: "", peso: "", altura: "", sexo: "",
    objetivo: "", nivel_atividade: "", rotina: "", habitos: "",
    restricoes: "", preferencias: "", dificuldades: "",
  });
  const s = k => v => setF(p => ({ ...p, [k]: v }));

  const gerar = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setConteudo(data.html);
      setEtapa(5);
    } catch {
      setErro("Não foi possível gerar o guia. Tente novamente.");
    }
    setCarregando(false);
  };

  const wrap = {
    minHeight: "100vh",
    background: `radial-gradient(ellipse 70% 50% at 15% 30%,rgba(80,150,20,.11) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 85% 70%,rgba(50,110,10,.08) 0%,transparent 55%),${G.bg}`,
    fontFamily: "'Segoe UI',system-ui,sans-serif",
    color: G.text,
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "48px 20px 72px",
  };

  const cartao = {
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${G.border}`,
    borderRadius: "18px", padding: "36px",
    width: "100%", maxWidth: "600px",
  };

  const btnP = {
    background: `linear-gradient(135deg,${G.accentDk},${G.accent})`,
    color: "#0a1a04", border: "none", borderRadius: "9px",
    padding: "13px 24px", fontSize: "14px", fontWeight: "700",
    cursor: "pointer", width: "100%", marginTop: "6px",
  };

  const btnS = {
    background: "rgba(255,255,255,.04)", color: G.muted,
    border: `1px solid ${G.border}`, borderRadius: "9px",
    padding: "11px 18px", fontSize: "13px", fontWeight: "600",
    cursor: "pointer", marginTop: "6px",
  };

  const etapaLabels = ["Dados", "Objetivo", "Rotina", "Restrições", "Revisar"];

  const progresso = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
      {etapaLabels.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: i < etapa ? G.accent : i === etapa ? "rgba(127,194,53,.15)" : "rgba(255,255,255,.05)",
              border: i === etapa ? `2px solid ${G.accent}` : "2px solid transparent",
              color: i < etapa ? "#0a1a04" : i === etapa ? G.accent : "rgba(255,255,255,.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: "700",
            }}>
              {i < etapa ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: "9px", color: i === etapa ? G.accent : G.muted, fontWeight: "600", whiteSpace: "nowrap" }}>{l}</span>
          </div>
          {i < etapaLabels.length - 1 && (
            <div style={{ width: "32px", height: "1px", background: i < etapa ? G.accent : G.border, margin: "0 3px 16px" }} />
          )}
        </div>
      ))}
    </div>
  );

  const tit = (t, sub) => (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "3px" }}>{t}</h2>
      <p style={{ color: G.muted, fontSize: "12.5px" }}>{sub}</p>
    </div>
  );

  const etapas = [
    <>
      {tit("Dados do Paciente", "Informações básicas para o protocolo")}
      <F label="Nome completo"><Inp v={f.nome} onChange={s("nome")} ph="Nome completo" /></F>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <F label="Idade"><Inp v={f.idade} onChange={s("idade")} ph="Ex: 28" type="number" /></F>
        <F label="Sexo"><Sel v={f.sexo} onChange={s("sexo")} opts={[{ v: "Feminino", l: "Feminino" }, { v: "Masculino", l: "Masculino" }]} /></F>
        <F label="Peso (kg)"><Inp v={f.peso} onChange={s("peso")} ph="Ex: 65" type="number" /></F>
        <F label="Altura (cm)"><Inp v={f.altura} onChange={s("altura")} ph="Ex: 165" type="number" /></F>
      </div>
      <button style={btnP} onClick={() => setEtapa(1)}>Continuar →</button>
    </>,

    <>
      {tit("Objetivo e Atividade Física", "O que a pessoa quer alcançar")}
      <F label="Objetivo principal">
        <Sel v={f.objetivo} onChange={s("objetivo")} opts={[
          { v: "Emagrecimento e redução de gordura corporal", l: "Emagrecimento / Perda de gordura" },
          { v: "Hipertrofia e ganho de massa muscular", l: "Hipertrofia / Ganho de massa" },
          { v: "Recomposição corporal", l: "Recomposição corporal" },
          { v: "Melhora da saúde, energia e qualidade de vida", l: "Saúde e qualidade de vida" },
          { v: "Manutenção do peso com mais equilíbrio", l: "Manutenção do peso" },
          { v: "Performance esportiva e rendimento", l: "Performance esportiva" },
        ]} />
      </F>
      <F label="Nível de atividade física">
        <Sel v={f.nivel_atividade} onChange={s("nivel_atividade")} opts={[
          { v: "Sedentário, sem exercícios regulares", l: "Sedentário (sem exercícios)" },
          { v: "Levemente ativo, 1 a 2 treinos por semana", l: "Leve (1-2x por semana)" },
          { v: "Moderadamente ativo, 3 a 4 treinos por semana", l: "Moderado (3-4x por semana)" },
          { v: "Muito ativo, 5 a 6 treinos por semana", l: "Muito ativo (5-6x por semana)" },
          { v: "Extremamente ativo, atleta ou treino diário intenso", l: "Atleta / treino diário" },
        ]} />
      </F>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={btnS} onClick={() => setEtapa(0)}>←</button>
        <button style={{ ...btnP, flex: 1, marginTop: 0 }} onClick={() => setEtapa(2)}>Continuar →</button>
      </div>
    </>,

    <>
      {tit("Rotina e Hábitos", "Quanto mais detalhes, mais preciso o guia")}
      <F label="Rotina diária (trabalho, horários, treino)">
        <Txt v={f.rotina} onChange={s("rotina")} ph="Ex: Trabalho das 8h às 17h, treino às 7h. Chego em casa às 18h..." />
      </F>
      <F label="Hábitos alimentares atuais">
        <Txt v={f.habitos} onChange={s("habitos")} ph="Ex: Pulo o café da manhã, almoço fora, como muito à noite..." />
      </F>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={btnS} onClick={() => setEtapa(1)}>←</button>
        <button style={{ ...btnP, flex: 1, marginTop: 0 }} onClick={() => setEtapa(3)}>Continuar →</button>
      </div>
    </>,

    <>
      {tit("Restrições e Dificuldades", "Para garantir segurança e adesão ao plano")}
      <F label="Restrições alimentares ou alergias">
        <Txt v={f.restricoes} onChange={s("restricoes")} rows={2} ph="Ex: Intolerante à lactose, não come carne vermelha. Ou 'Nenhuma'." />
      </F>
      <F label="Preferências alimentares">
        <Txt v={f.preferencias} onChange={s("preferencias")} rows={2} ph="Ex: Ama frango, ovos e frutas. Prefere comida caseira. Não gosta de peixe." />
      </F>
      <F label="Principais dificuldades com alimentação">
        <Txt v={f.dificuldades} onChange={s("dificuldades")} rows={3} ph="Ex: Ansiedade à noite, compulsão por doces, sem tempo para cozinhar..." />
      </F>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={btnS} onClick={() => setEtapa(2)}>←</button>
        <button style={{ ...btnP, flex: 1, marginTop: 0 }} onClick={() => setEtapa(4)}>Revisar →</button>
      </div>
    </>,

    <>
      {tit("Revisão dos Dados", "Confirme antes de gerar")}
      <div style={{ marginBottom: "20px" }}>
        {[
          ["Nome", f.nome], ["Sexo / Idade", `${f.sexo}, ${f.idade} anos`],
          ["Peso / Altura", `${f.peso} kg · ${f.altura} cm`],
          ["Objetivo", f.objetivo], ["Atividade", f.nivel_atividade],
          ["Rotina", f.rotina], ["Hábitos", f.habitos],
          ["Restrições", f.restricoes || "Nenhuma"],
          ["Preferências", f.preferencias], ["Dificuldades", f.dificuldades],
        ].filter(([, v]) => v).map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: "14px", padding: "8px 0", borderBottom: `1px solid ${G.border}`, fontSize: "12.5px" }}>
            <span style={{ color: G.muted, fontWeight: "600", minWidth: "100px", flexShrink: 0 }}>{k}</span>
            <span style={{ color: G.text, wordBreak: "break-word", lineHeight: "1.5" }}>{v}</span>
          </div>
        ))}
      </div>
      {erro && (
        <div style={{ background: "rgba(255,60,60,.1)", border: "1px solid rgba(255,60,60,.25)", borderRadius: "8px", padding: "10px 14px", color: "#ff9090", fontSize: "12.5px", marginBottom: "14px" }}>
          {erro}
        </div>
      )}
      <div style={{ background: "rgba(127,194,53,.07)", border: "1px solid rgba(127,194,53,.18)", borderRadius: "9px", padding: "12px 15px", marginBottom: "16px", fontSize: "12.5px", color: G.muted, lineHeight: "1.7" }}>
        O guia completo será elaborado e formatado. Isso pode levar até <strong style={{ color: G.text }}>60 segundos</strong>.
      </div>
      <button style={{ ...btnP, opacity: carregando ? .65 : 1 }} onClick={gerar} disabled={carregando}>
        {carregando
          ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid #0a1a04", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
              Elaborando protocolo personalizado...
            </span>
          : "Gerar Guia Nutricional Completo"}
      </button>
      <button style={{ ...btnS, width: "100%", textAlign: "center" }} onClick={() => setEtapa(3)}>← Editar dados</button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>,

    <>
      <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
        <div style={{ width: "52px", height: "52px", background: "rgba(127,194,53,.12)", border: `1.5px solid ${G.accent}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", margin: "0 auto 18px" }}>✓</div>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: G.accent, marginBottom: "6px" }}>Guia de {f.nome} está pronto</h2>
        <p style={{ color: G.muted, fontSize: "13px" }}>Clique em baixar para abrir o PDF formatado</p>
      </div>
      <div style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${G.border}`, borderRadius: "10px", padding: "16px 18px", marginBottom: "22px", fontSize: "12.5px", color: G.muted, lineHeight: "1.85" }}>
        <strong style={{ color: "rgba(255,255,255,.65)", display: "block", marginBottom: "7px" }}>Como salvar em PDF:</strong>
        1. Clique em <strong style={{ color: G.text }}>"Baixar PDF"</strong><br />
        2. Selecione <strong style={{ color: G.text }}>Salvar como PDF</strong> como destino<br />
        3. Clique em Salvar
      </div>
      <button style={btnP} onClick={() => abrirPDF(conteudo, f)}>⬇ Baixar PDF</button>
      <button style={{ ...btnS, width: "100%", textAlign: "center", marginTop: "10px" }}
        onClick={() => { setF({ nome: "", idade: "", peso: "", altura: "", sexo: "", objetivo: "", nivel_atividade: "", rotina: "", habitos: "", restricoes: "", preferencias: "", dificuldades: "" }); setConteudo(null); setEtapa(0); }}>
        Gerar para outro paciente
      </button>
    </>,
  ];

  return (
    <div style={wrap}>
      <div style={{ textAlign: "center", marginBottom: "40px", maxWidth: "460px" }}>
        <div style={{ width: "32px", height: "1.5px", background: G.accent, margin: "0 auto 18px" }} />
        <h1 style={{ fontSize: "clamp(24px,5vw,34px)", fontWeight: "800", color: "#f4f1ea", letterSpacing: "-.025em", lineHeight: 1.15, marginBottom: "9px" }}>
          Protocolo Nutricional
        </h1>
        <p style={{ color: G.muted, fontSize: "13px" }}>Preencha os dados e gere o guia completo em PDF</p>
      </div>
      <div style={cartao}>
        {etapa < 5 && progresso}
        {etapas[etapa]}
      </div>
    </div>
  );
}
