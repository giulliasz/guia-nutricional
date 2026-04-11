export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { content } = req.body;

    // Converte markdown para HTML estilizado
    const htmlContent = content
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Jost', sans-serif; background: #0a1f0e; color: #f5f0e0; font-size: 13px; line-height: 1.8; padding: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1 { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: #f5f0e0; margin: 40px 0 8px; border-bottom: 2px solid #e8934a; padding-bottom: 12px; }
h2 { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: #fac070; margin: 32px 0 10px; }
h3 { font-size: 14px; font-weight: 600; color: #8fcf9a; margin: 20px 0 6px; letter-spacing: 1px; text-transform: uppercase; }
p { margin-bottom: 10px; color: rgba(245,240,224,0.85); }
strong { color: #f5f0e0; font-weight: 600; }
em { font-style: italic; color: #f0a85a; }
ul { padding-left: 20px; margin-bottom: 12px; }
li { margin-bottom: 5px; color: rgba(245,240,224,0.8); }
hr { border: none; border-top: 1px solid rgba(232,147,74,0.2); margin: 28px 0; }
.header-block { background: linear-gradient(135deg, #1a4a20, #0d2810); border: 1px solid rgba(232,147,74,0.25); padding: 32px; margin-bottom: 32px; text-align: center; }
.header-block h1 { border: none; font-size: 42px; }
.header-block p { font-size: 14px; color: rgba(245,240,224,0.5); }
</style>
</head>
<body>
<div class="header-block">
  <h1>Guia Nutricional Personalizado</h1>
  <p>Seu Nutricionista • Material exclusivo e personalizado</p>
</div>
<p>${htmlContent}</p>
</body>
</html>`;

    // Retorna HTML para ser convertido no cliente
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
}
