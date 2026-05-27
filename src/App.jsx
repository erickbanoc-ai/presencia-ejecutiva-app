import { useState, useEffect, useRef } from "react";

const GOLD = "#B8860B";
const GOLD2 = "#C9963F";
const GOLDB = "#F0C060";
const DARK = "#1A1A2E";
const DARK2 = "#2D2D4E";
const SLATE = "#4A4A6A";
const CREAM = "#F8F5F0";
const CREAM2 = "#EDE9E2";
const BLUE = "#1A3A6B";
const RED = "#8B2020";
const GREEN = "#1A5C2A";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:wght@400;500;600&display=swap');

  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Karla',sans-serif;background:${CREAM};color:${DARK}}

  .app{max-width:900px;margin:0 auto;padding:0 0 80px 0}

  /* TOP BAR */
  .topbar{background:${DARK};padding:0;position:sticky;top:0;z-index:100;border-bottom:3px solid ${GOLD}}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:56px}
  .topbar-title{font-family:'Playfair Display',serif;font-size:14px;color:${GOLDB};letter-spacing:0.05em}
  .topbar-badge{background:${GOLD};color:${DARK};font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:0.08em}

  /* HERO */
  .hero{background:${DARK};padding:48px 32px 40px;border-bottom:4px solid ${GOLD};position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;right:-60px;top:-60px;width:300px;height:300px;border-radius:50%;border:1px solid rgba(201,150,63,0.15)}
  .hero::after{content:'';position:absolute;right:-20px;top:-20px;width:200px;height:200px;border-radius:50%;border:1px solid rgba(201,150,63,0.1)}
  .hero-label{font-size:11px;font-weight:600;color:${GOLD2};letter-spacing:0.2em;margin-bottom:12px;text-transform:uppercase}
  .hero-title{font-family:'Playfair Display',serif;font-size:38px;color:#fff;line-height:1.1;margin-bottom:16px}
  .hero-title span{color:${GOLDB}}
  .hero-quote{font-family:'Libre Baskerville',serif;font-size:15px;color:rgba(240,192,96,0.85);font-style:italic;line-height:1.7;max-width:520px;border-left:2px solid ${GOLD2};padding-left:16px}
  .hero-chips{display:flex;gap:10px;margin-top:28px;flex-wrap:wrap}
  .chip{background:rgba(201,150,63,0.15);border:1px solid rgba(201,150,63,0.35);color:${GOLDB};font-size:12px;padding:5px 14px;border-radius:20px;font-weight:500}

  /* PROGRESS BAR */
  .progress-section{background:${CREAM2};padding:16px 24px;border-bottom:1px solid #D4C9B0;display:flex;align-items:center;gap:16px}
  .progress-label{font-size:12px;font-weight:600;color:${SLATE};white-space:nowrap;min-width:90px}
  .progress-track{flex:1;height:6px;background:#D4C9B0;border-radius:3px;overflow:hidden}
  .progress-fill{height:100%;background:${GOLD};border-radius:3px;transition:width 0.5s ease}
  .progress-pct{font-size:13px;font-weight:700;color:${GOLD};min-width:36px;text-align:right}

  /* NAV TABS */
  .nav{display:flex;background:#fff;border-bottom:2px solid ${CREAM2};overflow-x:auto;scrollbar-width:none}
  .nav::-webkit-scrollbar{display:none}
  .nav-tab{padding:14px 20px;font-size:13px;font-weight:500;color:${SLATE};cursor:pointer;white-space:nowrap;border-bottom:3px solid transparent;transition:all 0.2s;flex-shrink:0;margin-bottom:-2px}
  .nav-tab:hover{color:${GOLD};background:#FDF8F0}
  .nav-tab.active{color:${GOLD};border-bottom-color:${GOLD};font-weight:600}
  .nav-tab .tab-badge{background:${GOLD};color:#fff;font-size:10px;padding:2px 6px;border-radius:10px;margin-left:6px}

  /* SECTION WRAPPER */
  .section{padding:28px 24px}

  /* CARDS */
  .card{background:#fff;border:1px solid #E0D9CE;border-radius:12px;padding:20px 22px;margin-bottom:16px;box-shadow:0 2px 8px rgba(26,26,46,0.06)}
  .card-gold{background:#FDF8F0;border-color:${GOLD2}}
  .card-blue{background:#F0F4F8;border-color:${BLUE}}
  .card-red{background:#FDF0EE;border-color:${RED}}
  .card-green{background:#F0F8F2;border-color:${GREEN}}
  .card-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  .card-icon{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  .card-icon-gold{background:${GOLD};color:#fff}
  .card-icon-blue{background:${BLUE};color:#fff}
  .card-icon-red{background:${RED};color:#fff}
  .card-title{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:${DARK}}
  .card-sub{font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${GOLD};margin-bottom:8px}
  .card-body{font-size:14px;color:${SLATE};line-height:1.65}

  /* SCALE BUTTONS */
  .scale-row{display:flex;align-items:center;gap:8px;margin-top:12px}
  .scale-lbl{font-size:11px;color:${SLATE};width:68px}
  .scale-lbl.right{text-align:right}
  .scale-btns{display:flex;gap:5px;flex:1;justify-content:center}
  .scale-btn{width:36px;height:36px;border-radius:50%;border:1.5px solid #D4C9B0;background:${CREAM2};font-size:13px;cursor:pointer;color:${SLATE};transition:all 0.15s;display:flex;align-items:center;justify-content:center;font-weight:500}
  .scale-btn:hover{border-color:${GOLD};color:${GOLD}}
  .scale-btn.sel{background:${GOLD};border-color:${GOLD};color:#fff}

  /* SCORE */
  .score-card{background:${DARK};border-radius:12px;padding:24px;text-align:center;margin-top:16px}
  .score-num{font-family:'Playfair Display',serif;font-size:54px;font-weight:700;color:${GOLDB}}
  .score-lbl{font-size:12px;color:rgba(240,192,96,0.7);margin-top:4px;letter-spacing:0.08em;text-transform:uppercase}
  .score-bar-wrap{background:rgba(255,255,255,0.1);border-radius:20px;height:8px;margin:16px 0 8px}
  .score-bar{height:8px;border-radius:20px;background:${GOLD};transition:width 0.8s ease}
  .score-msg{font-size:14px;color:rgba(255,255,255,0.8);line-height:1.6;margin-top:8px}

  /* EXERCISES */
  .exercise-wrap{border:1.5px solid ${GOLD2};border-radius:12px;overflow:hidden;margin-bottom:16px}
  .exercise-header{background:${DARK};padding:14px 18px;display:flex;align-items:center;justify-content:space-between}
  .exercise-title{font-family:'Playfair Display',serif;font-size:15px;color:${GOLDB}}
  .exercise-badge{background:${GOLD};color:${DARK};font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px}
  .exercise-body{padding:18px}
  .exercise-instructions{font-size:13px;color:${SLATE};line-height:1.65;margin-bottom:14px}
  .exercise-textarea{width:100%;border:1px solid #D4C9B0;border-radius:8px;padding:12px;font-size:13px;font-family:'Karla',sans-serif;color:${DARK};background:${CREAM};resize:vertical;min-height:80px;outline:none;transition:border-color 0.2s}
  .exercise-textarea:focus{border-color:${GOLD}}
  .exercise-btn{margin-top:10px;padding:9px 20px;background:${GOLD};border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'Karla',sans-serif;letter-spacing:0.03em;transition:background 0.2s}
  .exercise-btn:hover{background:${GOLD2}}
  .exercise-saved{margin-top:8px;font-size:12px;color:${GREEN};font-weight:500;display:flex;align-items:center;gap:4px}

  /* SYNTHESIS CARDS */
  .synth-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}
  .synth-card{border:1px solid #D4C9B0;border-radius:12px;overflow:hidden;background:#fff;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s}
  .synth-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,26,46,0.1)}
  .synth-q{padding:16px 18px;border-bottom:1px solid #EDE9E2}
  .synth-q-label{font-size:10px;font-weight:700;letter-spacing:0.12em;color:${GOLD};text-transform:uppercase;margin-bottom:6px}
  .synth-q-text{font-family:'Playfair Display',serif;font-size:14px;color:${DARK};line-height:1.5}
  .synth-a{padding:14px 18px;background:${CREAM2};display:none}
  .synth-a.visible{display:block}
  .synth-a-label{font-size:10px;font-weight:700;letter-spacing:0.12em;color:${GREEN};text-transform:uppercase;margin-bottom:6px}
  .synth-a-text{font-size:13px;color:${SLATE};line-height:1.6}
  .synth-toggle{font-size:12px;color:${GOLD};font-weight:600;padding:8px 18px;display:flex;align-items:center;gap:5px;border-top:1px solid #EDE9E2}

  /* COMMITMENTS */
  .comp-item{display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:10px;margin-bottom:10px;background:#fff;border:1px solid #E0D9CE;transition:background 0.2s}
  .comp-item.done{background:#F0F8F2;border-color:#C8E8CC}
  .comp-check{width:22px;height:22px;border-radius:6px;border:2px solid #D4C9B0;flex-shrink:0;margin-top:1px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.15s;background:#fff}
  .comp-check.done{background:${GREEN};border-color:${GREEN};color:#fff}
  .comp-text{font-size:13.5px;color:${SLATE};line-height:1.55;flex:1}
  .comp-text.done{text-decoration:line-through;color:#999}
  .comp-session{font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;margin-top:18px}
  .add-row{display:flex;gap:8px;margin-top:12px}
  .add-input{flex:1;border:1px solid #D4C9B0;border-radius:8px;padding:10px 12px;font-size:13px;font-family:'Karla',sans-serif;background:${CREAM};color:${DARK};outline:none}
  .add-input:focus{border-color:${GOLD}}
  .add-btn{padding:10px 18px;background:${GOLD};border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'Karla',sans-serif;white-space:nowrap}

  /* STATS ROW */
  .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
  .stat-box{background:#fff;border:1px solid #E0D9CE;border-radius:10px;padding:14px;text-align:center;border-top:3px solid ${GOLD}}
  .stat-num{font-family:'Playfair Display',serif;font-size:28px;color:${GOLD};font-weight:700}
  .stat-lbl{font-size:11px;color:${SLATE};margin-top:4px;line-height:1.4}

  /* VIDEO LINKS */
  .video-card{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;border:1px solid ${GOLD2};background:#FDF8F0;margin-bottom:8px;text-decoration:none;transition:background 0.2s}
  .video-card:hover{background:#FAF0E0}
  .video-icon{width:32px;height:32px;background:${GOLD};border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#fff}
  .video-info-title{font-size:13px;font-weight:600;color:${DARK};line-height:1.4}
  .video-info-meta{font-size:11px;color:${SLATE};margin-top:2px}

  /* CLOSING QUOTE */
  .closing-card{background:${DARK};border-radius:14px;padding:32px 28px;text-align:center;margin-top:20px}
  .closing-icon{font-size:32px;margin-bottom:16px}
  .closing-quote{font-family:'Libre Baskerville',serif;font-size:18px;color:${GOLDB};font-style:italic;line-height:1.7;margin-bottom:16px}
  .closing-author{font-size:12px;color:rgba(240,192,96,0.6);letter-spacing:0.1em;text-transform:uppercase}

  /* BUTTONS */
  .primary-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:${GOLD};border:none;border-radius:8px;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:'Karla',sans-serif;letter-spacing:0.02em;transition:background 0.2s}
  .primary-btn:hover{background:${GOLD2}}
  .section-title{font-family:'Playfair Display',serif;font-size:22px;color:${DARK};margin-bottom:6px}
  .section-subtitle{font-size:13px;color:${SLATE};margin-bottom:22px;line-height:1.55}

  @media(max-width:600px){.hero-title{font-size:28px}.stats-row{grid-template-columns:1fr}.synth-grid{grid-template-columns:1fr}}
`;

const DIAGNOSTIC_QUESTIONS = [
  { id:"q1", text:"Cuando entro a una reunión, siento que las personas me notan antes de que hable.", low:"Casi nunca", high:"Siempre" },
  { id:"q2", text:"Mi postura y lenguaje corporal comunican confianza sin que yo lo intente conscientemente.", low:"Casi nunca", high:"Siempre" },
  { id:"q3", text:"Tengo claridad sobre la narrativa interna que me impulsa como líder.", low:"Casi nunca", high:"Siempre" },
  { id:"q4", text:"Las personas en mi entorno me perciben como alguien con autoridad natural.", low:"Casi nunca", high:"Siempre" },
  { id:"q5", text:"Soy capaz de mantener calma y compostura visibles en situaciones de alta presión.", low:"Casi nunca", high:"Siempre" },
  { id:"q6", text:"Mi voz proyecta credibilidad y control — no sube de tono cuando me estreso.", low:"Casi nunca", high:"Siempre" },
];

const EXERCISES = {
  s1: [
    { id:"e1", session:1, title:"El Ancla de Presencia", badge:"Sesión 1", instruction:"Antes de tu próxima reunión importante, practica 60 segundos: pies firmes en el suelo, respiración profunda, repite tu intención de presencia. ¿Qué notaste durante el ejercicio?", placeholder:"¿Qué sensación te quedó? ¿Fue más fácil o más difícil de lo esperado?" },
    { id:"e2", session:1, title:"Narrativa Interna del Líder", badge:"Sesión 1", instruction:"Completa esta frase en 3 versiones diferentes: 'Soy el tipo de líder que...' Escoge la versión que más te resuena.", placeholder:"Versión 1: Soy el tipo de líder que...\nVersión 2: Soy el tipo de líder que...\nVersión 3: Soy el tipo de líder que..." },
  ],
  s2: [
    { id:"e3", session:2, title:"Protocolo POSE en Vivo", badge:"Sesión 2", instruction:"Antes de tu próxima reunión de alto impacto, aplica el protocolo completo: Prepare (define tu intención), Open (2 min postura expansiva en privado), Sustain (apertura durante toda la reunión), Embody (conecta cuerpo y narrativa). ¿Cómo resultó?", placeholder:"Describe qué cambió en tu experiencia de la reunión al usar el protocolo..." },
    { id:"e4", session:2, title:"La Pausa de 3 Segundos", badge:"Sesión 2", instruction:"Esta semana, en al menos 3 conversaciones difíciles o preguntas inesperadas, practica la pausa de exactamente 3 segundos antes de responder. Registra lo que observaste.", placeholder:"¿Qué notaron los demás? ¿Cómo te sentiste? ¿Qué fue lo más difícil?" },
  ],
  s3: [
    { id:"e5", session:3, title:"Diagnóstico Vocal — Tu Nombre", badge:"Sesión 3", instruction:"Di tu nombre completo y cargo en voz alta 3 veces: primero normal, luego con tono descendente al final, luego con pausa de 2 segundos después del nombre. Grábate si es posible. ¿Qué diferencia notaste?", placeholder:"¿En cuál versión sonaste más como líder? ¿Qué cambió en tu percepción?" },
    { id:"e6", session:3, title:"Mapa de Percepción Externa", badge:"Sesión 3", instruction:"Identifica 3 personas de tu entorno profesional. Escribe en una palabra cómo crees que te perciben. ¿Coincide con cómo quieres ser percibido?", placeholder:"Persona 1 — Cargo: ___ / Me percibe como: ___\nPersona 2 — Cargo: ___ / Me percibe como: ___\nPersona 3 — Cargo: ___ / Me percibe como: ___" },
  ]
};

const SYNTHESIS = {
  s1: [
    { q:"¿Qué porcentaje del impacto de tu presencia ejecutiva es gravitas?", a:"67% — según Hewlett, basado en 268 ejecutivos senior encuestados. Comunicación es 28% y apariencia solo 5%." },
    { q:"¿Cuál es el pilar #1 del gravitas según esos ejecutivos?", a:"Gracia bajo fuego — compostura absoluta y competencia visible en el epicentro de la crisis." },
    { q:"¿Qué 2 pilares añade Hewlett 2.0 en 2024?", a:"Inclusividad (crear condiciones para que otros brillen) y Autenticidad (coherencia entre valores y comportamiento)." },
    { q:"¿Para qué sirve el modelo T.O.T.E. en este módulo?", a:"Para fijar un objetivo medible de presencia en la Sesión 1 y evaluar tu evolución real en la Sesión 3." },
  ],
  s2: [
    { q:"¿Qué confirma la ciencia sobre las posturas expansivas de Cuddy?", a:"Reducción de ansiedad subjetiva y aumento de confianza percibida por otros. El efecto psicológico está replicado." },
    { q:"¿Qué NO confirma la ciencia sobre Cuddy?", a:"Los cambios hormonales directos (testosterona/cortisol) no se han replicado consistentemente. El co-autor retractó esa parte." },
    { q:"¿Qué es el iHunch y por qué importa?", a:"Postura contractiva al usar el celular que envía señales de sumisión al cerebro y al interlocutor." },
    { q:"¿Qué logran los 3 segundos de pausa estratégica?", a:"Comunican control, generan impacto dramático y elevan el estatus percibido del líder." },
  ],
  s3: [
    { q:"¿Qué significa que la voz baje al final de una afirmación?", a:"Proyecta seguridad y autoridad. El upspeak (tono ascendente) convierte afirmaciones en preguntas — comunica duda." },
    { q:"¿Con cuánta información decide un gran líder?", a:"Con el 70% — no esperan certeza total. Deciden y ajustan en el camino (Jeff Bezos, 'la regla del 70%')." },
    { q:"¿Cuáles son las 3 Cs de Vocal Executive Presence (Sicola)?", a:"Command the Room (proyección y ritmo), Connect the Audience (rapport y downward inflection), Close the Deal (silencio estratégico)." },
    { q:"¿Qué es el EXIT del modelo T.O.T.E.?", a:"El Elevator Pitch 2.0 en Sesión 3, donde evalúas si alcanzaste el objetivo de presencia que te propusiste en el Día 1." },
  ]
};

const COMMITMENTS_DEFAULT = [
  { id:"c1", session:1, text:"Practicar el ancla de presencia antes de mi próxima reunión importante.", done:false },
  { id:"c2", session:1, text:"Escribir mi narrativa interna de liderazgo en una frase y usarla como ancla mental.", done:false },
  { id:"c3", session:2, text:"Aplicar el protocolo POSE completo al menos 3 veces esta semana.", done:false },
  { id:"c4", session:2, text:"Practicar la pausa de 3 segundos en conversaciones difíciles o preguntas inesperadas.", done:false },
  { id:"c5", session:3, text:"Grabarme diciendo mi nombre y cargo y escuchar mi tono de voz críticamente.", done:false },
  { id:"c6", session:3, text:"Pedir feedback de percepción a dos personas de confianza usando las preguntas del módulo.", done:false },
];

const VIDEOS = [
  { label:"Video de apertura — Ale Marroquín (español, 4 min)", meta:"Presencia ejecutiva y liderazgo", url:"https://www.youtube.com/watch?v=GKftsvE6rVM", session:"Apertura" },
  { label:"Amy Cuddy TED — Your Body Language (subtítulos español)", meta:"21 min · Harvard · 65M vistas", url:"https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are?language=es", session:"S2" },
  { label:"Laura Sicola TEDx — Want to Sound Like a Leader?", meta:"6 min · 6.8M vistas · inglés con subtítulos", url:"https://www.youtube.com/watch?v=sb3wdVuYmks", session:"S3" },
  { label:"Elevator Pitch en 20 segundos — eduCaixa", meta:"3 min · español", url:"https://www.youtube.com/watch?v=2b3xG_YjgvI", session:"S1" },
  { label:"Ejemplo Elevator Pitch — Alicia Ro", meta:"3 min · español · modelo profesional", url:"https://www.youtube.com/watch?v=uv357YzY7-k", session:"S1/S3" },
  { label:"Liderazgo femenino y presencia ejecutiva — CEO Patricia Field", meta:"2025 · español · testimonio real", url:"https://www.youtube.com/watch?v=CWP4mbS3XM8", session:"S1" },
];

export default function App() {
  const [tab, setTab] = useState("diagnostico");
  const [answers, setAnswers] = useState({});
  const [scoreVisible, setScoreVisible] = useState(false);
  const [saved, setSaved] = useState({});
  const [reflections, setReflections] = useState({});
  const [synthOpen, setSynthOpen] = useState({});
  const [commitments, setCommitments] = useState(COMMITMENTS_DEFAULT);
  const [newComp, setNewComp] = useState("");
  const [compSession, setCompSession] = useState(1);

  const score = Object.values(answers).length === 6
    ? Math.round((Object.values(answers).reduce((a,b)=>a+b,0)/30)*100)
    : null;

  function scoreMsg(s) {
    if (s <= 35) return "Tu presencia ejecutiva tiene un gran potencial de desarrollo. Este módulo está diseñado exactamente para esto.";
    if (s <= 60) return "Tienes bases sólidas. Las herramientas de este módulo llevarán tu presencia al siguiente nivel.";
    if (s <= 80) return "Tu presencia ejecutiva ya es una fortaleza. El módulo te ayudará a hacerla más consistente e intencional.";
    return "Excelente nivel de presencia ejecutiva. Este módulo refinará lo que ya dominas y añadirá dimensiones de Hewlett 2.0.";
  }

  const donePct = Math.round((commitments.filter(c=>c.done).length/commitments.length)*100);

  const allExercises = [...EXERCISES.s1, ...EXERCISES.s2, ...EXERCISES.s3];
  const exercisesDone = allExercises.filter(e=>saved[e.id]).length;
  const exercisesPct = Math.round((exercisesDone/allExercises.length)*100);

  function addCommitment() {
    if (!newComp.trim()) return;
    setCommitments(c=>[...c,{ id:"custom_"+Date.now(), session:compSession, text:newComp.trim(), done:false }]);
    setNewComp("");
  }

  const tabs = [
    { id:"diagnostico", label:"Diagnóstico", badge:score?`${score}%`:null },
    { id:"s1", label:"Sesión 1" },
    { id:"s2", label:"Sesión 2" },
    { id:"s3", label:"Sesión 3" },
    { id:"compromisos", label:"Compromisos", badge:`${donePct}%` },
    { id:"videos", label:"Videos" },
  ];

  function renderExercises(exercises) {
    return exercises.map(ex => (
      <div key={ex.id} className="exercise-wrap">
        <div className="exercise-header">
          <span className="exercise-title">{ex.title}</span>
          <span className="exercise-badge">{ex.badge}</span>
        </div>
        <div className="exercise-body">
          <p className="exercise-instructions">{ex.instruction}</p>
          <textarea
            className="exercise-textarea"
            placeholder={ex.placeholder}
            value={reflections[ex.id]||""}
            onChange={e=>setReflections(r=>({...r,[ex.id]:e.target.value}))}
            rows={3}
          />
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button className="exercise-btn" onClick={()=>{ if(reflections[ex.id]?.trim()) setSaved(s=>({...s,[ex.id]:true})); }}>
              Guardar reflexión
            </button>
            {saved[ex.id] && <span className="exercise-saved">✓ Guardado</span>}
          </div>
        </div>
      </div>
    ));
  }

  function renderSynthesis(cards) {
    return (
      <div className="synth-grid">
        {cards.map((card,i)=>{
          const key = tab+"_"+i;
          return (
            <div key={key} className="synth-card" onClick={()=>setSynthOpen(s=>({...s,[key]:!s[key]}))}>
              <div className="synth-q">
                <div className="synth-q-label">Pregunta {i+1}</div>
                <div className="synth-q-text">{card.q}</div>
              </div>
              <div className={`synth-a ${synthOpen[key]?"visible":""}`}>
                <div className="synth-a-label">Respuesta</div>
                <div className="synth-a-text">{card.a}</div>
              </div>
              <div className="synth-toggle">
                {synthOpen[key] ? "▲ Ocultar respuesta" : "▼ Ver respuesta"}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const closingQuotes = {
    s1: "No se trata de fingir autoridad. Se trata de descubrir la que ya tienes y aprender a instalarla con intención.",
    s2: "Tu cuerpo ya habla. La pregunta es: ¿estás diciéndole a la sala lo que quieres que escuche?",
    s3: "La presencia ejecutiva no es un destino. Es la práctica diaria de ser quien ya eres, con toda la intención del mundo.",
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-inner">
            <span className="topbar-title">MÓDULO 2 · Presencia Ejecutiva y Gravitas</span>
            <span className="topbar-badge">3 SESIONES · 6H</span>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-label">Programa de Alta Dirección</div>
          <h1 className="hero-title">Presencia Ejecutiva<br/><span>y Gravitas</span></h1>
          <p className="hero-quote">
            «La autoridad real no se declara.<br/>
            Se instala en silencio, antes de que abras la boca.»
          </p>
          <div className="hero-chips">
            <span className="chip">Gravitas 67%</span>
            <span className="chip">3 Sesiones</span>
            <span className="chip">Hewlett 2.0</span>
            <span className="chip">Ejercicios en vivo</span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="progress-section">
          <span className="progress-label">Ejercicios</span>
          <div className="progress-track"><div className="progress-fill" style={{width:exercisesPct+"%"}}/></div>
          <span className="progress-pct">{exercisesPct}%</span>
        </div>

        {/* TABS */}
        <div className="nav">
          {tabs.map(t=>(
            <div key={t.id} className={`nav-tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              {t.label}
              {t.badge && <span className="tab-badge">{t.badge}</span>}
            </div>
          ))}
        </div>

        {/* ── DIAGNÓSTICO ── */}
        {tab==="diagnostico" && (
          <div className="section">
            <div className="section-title">Diagnóstico de Presencia Ejecutiva</div>
            <p className="section-subtitle">Responde con honestidad — este diagnóstico es solo para ti. Lo revisaremos al cierre del curso para medir tu evolución.</p>

            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-num">67%</div>
                <div className="stat-lbl">del impacto es Gravitas (Hewlett)</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">268</div>
                <div className="stat-lbl">ejecutivos senior encuestados</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">81%</div>
                <div className="stat-lbl">pierden ascensos sin EP</div>
              </div>
            </div>

            {DIAGNOSTIC_QUESTIONS.map(q=>(
              <div key={q.id} className="card card-gold">
                <p className="card-body" style={{fontWeight:500,color:DARK,marginBottom:4}}>{q.text}</p>
                <div className="scale-row">
                  <span className="scale-lbl">{q.low}</span>
                  <div className="scale-btns">
                    {[1,2,3,4,5].map(v=>(
                      <button
                        key={v}
                        className={`scale-btn ${answers[q.id]===v?"sel":""}`}
                        onClick={()=>{setAnswers(a=>({...a,[q.id]:v}));setScoreVisible(false);}}
                      >{v}</button>
                    ))}
                  </div>
                  <span className="scale-lbl right">{q.high}</span>
                </div>
              </div>
            ))}

            <button
              className="primary-btn"
              style={{width:"100%",justifyContent:"center",marginTop:8}}
              onClick={()=>{ if(Object.keys(answers).length===6) setScoreVisible(true); }}
            >
              Ver mi diagnóstico
            </button>

            {scoreVisible && score !== null && (
              <div className="score-card">
                <div className="score-num">{score}</div>
                <div className="score-lbl">Índice de Presencia Ejecutiva</div>
                <div className="score-bar-wrap">
                  <div className="score-bar" style={{width:score+"%"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(240,192,96,0.5)",marginBottom:12}}>
                  <span>0</span><span>100</span>
                </div>
                <div className="score-msg">{scoreMsg(score)}</div>
              </div>
            )}
          </div>
        )}

        {/* ── SESIÓN 1 ── */}
        {tab==="s1" && (
          <div className="section">
            <div className="section-title">Sesión 1 — Los Cimientos de la Autoridad</div>
            <p className="section-subtitle">Objetivo: Desmitificar la Presencia Ejecutiva, diagnosticar tu proyección actual y trabajar la reconfiguración mental a través de la narrativa interna.</p>

            <div className="card card-gold" style={{marginBottom:20}}>
              <div className="card-sub">Fórmula de Hewlett (2014)</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
                {[["67%","GRAVITAS","El corazón de la presencia"],["28%","COMUNICACIÓN","Verbal y no verbal"],["5%","APARIENCIA","Imagen física"]].map(([pct,lbl,desc],i)=>(
                  <div key={i} style={{textAlign:"center",padding:"12px 8px",background:i===0?"#1A1A2E":"#fff",borderRadius:8,border:`1.5px solid ${i===0?GOLD:"#E0D9CE"}`}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:i===0?GOLDB:GOLD}}>{pct}</div>
                    <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:i===0?"rgba(240,192,96,0.7)":SLATE,margin:"4px 0"}}>{lbl}</div>
                    <div style={{fontSize:11,color:i===0?"rgba(255,255,255,0.5)":"#888"}}>{desc}</div>
                  </div>
                ))}
              </div>
              <p className="card-body">Basado en encuestas a 268 ejecutivos senior Fortune 500. El gravitas es el pilar maestro — sin él, la comunicación perfecta y la apariencia impecable no bastan.</p>
            </div>

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:24}}>Los 6 Pilares del Gravitas — Hewlett 2.0</h3>
            {[
              {ic:"🔥",t:"Gracia bajo fuego",d:"Compostura absoluta en el epicentro de la crisis. El pilar #1 más votado por ejecutivos senior.",tag:"#1 MÁS VOTADO",c:GOLD},
              {ic:"🧠",t:"Profundidad intelectual",d:"Conocer tu tema 'en frío'. Responder hasta 6 preguntas de profundidad encadenadas sin perder el hilo.",tag:"CREDIBILIDAD",c:BLUE},
              {ic:"⚡",t:"Decisión y valentía",d:"Decidir cuando nadie más se atreve. Decirle la verdad al poder (speaking truth to power).",tag:"LIDERAZGO",c:DARK},
              {ic:"❤️",t:"Inteligencia emocional",d:"Leer la habitación. Saber cuándo empujar y cuándo ceder. El 61% de los ejecutivos lo cita como clave.",tag:"61% LO CITA",c:RED},
              {ic:"🤝",t:"Inclusividad — NUEVO 2024",d:"Crear condiciones para que otros brillen. Escuchar para aprender, no solo para responder.",tag:"★ NUEVO 2024",c:GOLD},
              {ic:"✨",t:"Autenticidad — NUEVO 2024",d:"Coherencia entre valores declarados y comportamiento observable. Sin ella, el gravitas es teatro.",tag:"★ NUEVO 2024",c:GOLD},
            ].map((p,i)=>(
              <div key={i} className="card" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div className="card-icon" style={{background:p.c,color:"#fff",flexShrink:0}}>{p.ic}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <span style={{fontWeight:700,color:p.c,fontSize:14}}>{p.t}</span>
                    <span style={{fontSize:10,background:p.c===GOLD?"#FDF3E0":"#F0F0F0",color:p.c,padding:"2px 8px",borderRadius:10,fontWeight:700,letterSpacing:"0.05em"}}>{p.tag}</span>
                  </div>
                  <p className="card-body">{p.d}</p>
                </div>
              </div>
            ))}

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:28}}>Ejercicios de la Sesión</h3>
            {renderExercises(EXERCISES.s1)}

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:28}}>Tarjetas de Síntesis — Toca para revelar</h3>
            {renderSynthesis(SYNTHESIS.s1)}

            <div className="closing-card" style={{marginTop:24}}>
              <div className="closing-icon">🏛️</div>
              <p className="closing-quote">{closingQuotes.s1}</p>
              <div className="closing-author">— Cierre Sesión 1</div>
            </div>
          </div>
        )}

        {/* ── SESIÓN 2 ── */}
        {tab==="s2" && (
          <div className="section">
            <div className="section-title">Sesión 2 — El Cuerpo como Instrumento</div>
            <p className="section-subtitle">Objetivo: Dominar el lenguaje corporal y vocal como herramienta de reputación, y entender las dinámicas de espacio y poder.</p>

            <div className="card card-blue">
              <div className="card-sub">Protocolo POSE — Amy Cuddy / PNL</div>
              {[
                {l:"P","t":"Prepare","d":"Define tu intención de presencia para esa reunión específica."},
                {l:"O","t":"Open","d":"2 min postura expansiva en privado. Pies firmes, hombros abiertos, cabeza erguida."},
                {l:"S","t":"Sustain","d":"Mantén apertura corporal durante toda la reunión. Sin cruzar brazos."},
                {l:"E","t":"Embody","d":"Conecta el cuerpo con tu narrativa interna de liderazgo. No actúes — sé."},
              ].map((p,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
                  <div style={{width:32,height:32,background:BLUE,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,flexShrink:0}}>{p.l}</div>
                  <div>
                    <span style={{fontWeight:700,color:BLUE,fontSize:13}}>{p.t}</span>
                    <span style={{fontSize:13,color:SLATE,marginLeft:6}}>{p.d}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,margin:"16px 0"}}>
              <div className="card card-green">
                <div className="card-sub" style={{color:GREEN}}>✓ La ciencia confirma</div>
                <p className="card-body">Posturas expansivas reducen la ansiedad subjetiva y aumentan la confianza percibida por evaluadores externos. Replicado ampliamente.</p>
              </div>
              <div className="card card-red">
                <div className="card-sub" style={{color:RED}}>✗ No confirmado — enseña esto</div>
                <p className="card-body">Los cambios hormonales directos (testosterona/cortisol) no se replicaron. El co-autor retractó esa parte. Presentar con honestidad aumenta tu credibilidad.</p>
              </div>
            </div>

            <div className="card" style={{marginBottom:16}}>
              <div className="card-sub">Korda · Kanter · Greene — El poder del espacio</div>
              {[
                {ic:"⏱️",t:"Control del tiempo","d":"Quien marca los tiempos tiene poder. Hacer esperar es un gesto de autoridad. (Korda, 1975)"},
                {ic:"🪑",t:"Control del espacio","d":"La posición en la mesa, el tamaño del escritorio — todo comunica jerarquía antes de hablar."},
                {ic:"🧘",t:"Quietud deliberada","d":"Quien se mueve frenéticamente comunica subordinación. El líder domina desde la quietud fluida."},
                {ic:"🤝",t:"Poder social","d":"Intervenir por otros y desviar recursos en su favor sin consecuencias. (Kanter, Harvard)"},
              ].map((c,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
                  <span style={{fontSize:18,flexShrink:0}}>{c.ic}</span>
                  <div><span style={{fontWeight:600,color:DARK,fontSize:13}}>{c.t}: </span><span style={{fontSize:13,color:SLATE}}>{c.d}</span></div>
                </div>
              ))}
            </div>

            <div className="card card-gold">
              <div className="card-sub">Pausa Estratégica — Robert Greene, Ley 4</div>
              <p className="card-body" style={{marginBottom:12}}>"Di siempre menos de lo necesario." La pausa de 3 segundos antes de responder comunica control, genera impacto dramático y eleva el estatus percibido.</p>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:64,height:64,border:`3px solid ${GOLD}`,borderRadius:"50%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:GOLD}}>3"</span>
                </div>
                <div style={{fontSize:13,color:SLATE,lineHeight:1.6}}>Uno — Dos — Tres. Luego responde con el tono más grave y más lento que puedas sostener con naturalidad. Practica esta semana en al menos 3 conversaciones difíciles.</div>
              </div>
            </div>

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:28}}>Ejercicios de la Sesión</h3>
            {renderExercises(EXERCISES.s2)}

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:28}}>Tarjetas de Síntesis — Toca para revelar</h3>
            {renderSynthesis(SYNTHESIS.s2)}

            <div className="closing-card" style={{marginTop:24}}>
              <div className="closing-icon">🧘</div>
              <p className="closing-quote">{closingQuotes.s2}</p>
              <div className="closing-author">— Cierre Sesión 2</div>
            </div>
          </div>
        )}

        {/* ── SESIÓN 3 ── */}
        {tab==="s3" && (
          <div className="section">
            <div className="section-title">Sesión 3 — Maestría Vocal y Evaluación Final</div>
            <p className="section-subtitle">Objetivo: Pulir las habilidades vocales, entrenar el manejo de presión y medir tu evolución con el Elevator Pitch 2.0.</p>

            <div className="card card-red" style={{marginBottom:16}}>
              <div className="card-sub" style={{color:RED}}>Las 3 Cs — Dr. Laura Sicola</div>
              {[
                {l:"C",t:"Command the Room","d":"Proyección, volumen intencional, ritmo deliberado. Tu voz ocupa el espacio antes de que el contenido llegue."},
                {l:"C",t:"Connect the Audience","d":"Downward inflection (tono descendente al final de afirmaciones). El upspeak convierte afirmaciones en preguntas."},
                {l:"C",t:"Close the Deal","d":"Saber cuándo hacer silencio y cuándo hablar para guiar una decisión. El silencio estratégico antes de tu punto lo hace irresistible."},
              ].map((c,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                  <div style={{width:32,height:32,background:RED,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,flexShrink:0}}>{c.l}</div>
                  <div><span style={{fontWeight:700,color:RED,fontSize:13}}>{c.t}: </span><span style={{fontSize:13,color:SLATE}}>{c.d}</span></div>
                </div>
              ))}
            </div>

            <div className="card card-gold" style={{marginBottom:16}}>
              <div className="card-sub">Gracia Bajo Fuego — Hewlett</div>
              <p className="card-body" style={{marginBottom:12}}>La característica #1 del gravitas. No es evitar las crisis — es proyectar calma absoluta y competencia visible en el peor momento.</p>
              {[
                {t:"Regulación emocional visible","d":"Tu cara, ritmo de voz y postura comunican en tiempo real si estás en control."},
                {t:"Responsabilidad sin victimismo","d":'"Esto pasó bajo mi liderazgo. Este es nuestro plan." Sin excusas, sin sobre-explicar.'},
                {t:"Decisión con info incompleta","d":"La regla del 70% (Bezos): decide con lo que tienes y ajusta en el camino."},
                {t:"Leer la habitación (EQ)","d":"Autoconciencia + autorregulación + empatía táctica — el trifecta del gravitas emocional."},
              ].map((c,i)=>(
                <div key={i} style={{padding:"8px 0",borderTop:i>0?"1px solid #EDE9E2":undefined}}>
                  <span style={{fontWeight:600,color:GOLD,fontSize:13}}>{c.t}: </span>
                  <span style={{fontSize:13,color:SLATE}}>{c.d}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{border:`1.5px solid ${GREEN}`,background:"#F0F8F2",marginBottom:16}}>
              <div className="card-sub" style={{color:GREEN}}>Elevator Pitch 2.0 — Checklist de Evaluación Final</div>
              {[
                "Postura expansiva visible en cámara",
                "Contacto visual: mirar al lente, no a la pantalla",
                "Tono descendente al final de afirmaciones clave",
                "Al menos 1 pausa estratégica de 3 segundos",
                "Sin notas físicas ni slides de apoyo",
                "Mensaje claro en 90 segundos",
              ].map((it,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"6px 0",borderTop:i>0?"1px solid #C8E8CC":undefined}}>
                  <span style={{color:GREEN,fontSize:16,flexShrink:0}}>✓</span>
                  <span style={{fontSize:13,color:SLATE}}>{it}</span>
                </div>
              ))}
            </div>

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:28}}>Ejercicios de la Sesión</h3>
            {renderExercises(EXERCISES.s3)}

            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:DARK,marginBottom:12,marginTop:28}}>Tarjetas de Síntesis — Toca para revelar</h3>
            {renderSynthesis(SYNTHESIS.s3)}

            <div className="closing-card" style={{marginTop:24}}>
              <div className="closing-icon">🌟</div>
              <p className="closing-quote">{closingQuotes.s3}</p>
              <div className="closing-author">— Cierre del Módulo</div>
            </div>
          </div>
        )}

        {/* ── COMPROMISOS ── */}
        {tab==="compromisos" && (
          <div className="section">
            <div className="section-title">Mis Compromisos</div>
            <p className="section-subtitle">Al final de cada sesión registra tu acción concreta. Marca cuando la cumplas — el accountability externo multiplica los resultados.</p>

            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-num">{commitments.length}</div>
                <div className="stat-lbl">Compromisos totales</div>
              </div>
              <div className="stat-box">
                <div className="stat-num" style={{color:GREEN}}>{commitments.filter(c=>c.done).length}</div>
                <div className="stat-lbl">Cumplidos</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">{donePct}%</div>
                <div className="stat-lbl">Avance total</div>
              </div>
            </div>

            <div style={{background:"#fff",borderRadius:8,overflow:"hidden",height:8,marginBottom:24,border:"1px solid #E0D9CE"}}>
              <div style={{height:8,background:GOLD,width:donePct+"%",transition:"width 0.5s ease"}}/>
            </div>

            {[1,2,3].map(session=>(
              <div key={session}>
                <div className="comp-session" style={{color:session===1?GOLD:session===2?BLUE:RED}}>
                  Sesión {session}
                </div>
                {commitments.filter(c=>c.session===session).map(c=>(
                  <div key={c.id} className={`comp-item ${c.done?"done":""}`}>
                    <div
                      className={`comp-check ${c.done?"done":""}`}
                      onClick={()=>setCommitments(cs=>cs.map(x=>x.id===c.id?{...x,done:!x.done}:x))}
                    >{c.done?"✓":""}</div>
                    <span className={`comp-text ${c.done?"done":""}`}>{c.text}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="comp-session" style={{color:SLATE,marginTop:24}}>Agregar compromiso</div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              {[1,2,3].map(n=>(
                <button
                  key={n}
                  onClick={()=>setCompSession(n)}
                  style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${compSession===n?GOLD:"#D4C9B0"}`,background:compSession===n?GOLD:"#fff",color:compSession===n?"#fff":SLATE,fontSize:12,fontWeight:600,cursor:"pointer"}}
                >
                  Sesión {n}
                </button>
              ))}
            </div>
            <div className="add-row">
              <input
                className="add-input"
                placeholder="Escribe tu compromiso específico..."
                value={newComp}
                onChange={e=>setNewComp(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addCommitment()}
              />
              <button className="add-btn" onClick={addCommitment}>+ Agregar</button>
            </div>
          </div>
        )}

        {/* ── VIDEOS ── */}
        {tab==="videos" && (
          <div className="section">
            <div className="section-title">Videos de Referencia</div>
            <p className="section-subtitle">Todos verificados y con acceso libre. Los links abren directamente en YouTube o TED.</p>

            {VIDEOS.map((v,i)=>(
              <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" className="video-card">
                <div className="video-icon">▶</div>
                <div style={{flex:1}}>
                  <div className="video-info-title">{v.label}</div>
                  <div className="video-info-meta">{v.meta} · {v.session}</div>
                </div>
                <div style={{fontSize:16,color:GOLD,flexShrink:0}}>→</div>
              </a>
            ))}

            <div className="card" style={{marginTop:24,background:DARK,border:"none"}}>
              <p style={{fontSize:13,color:"rgba(240,192,96,0.8)",lineHeight:1.7}}>
                <strong style={{color:GOLDB}}>Nota del facilitador:</strong> Los videos de Amy Cuddy y Laura Sicola funcionan especialmente bien cuando se muestran en sala ANTES de los ejercicios correspondientes — no después. El contraste entre lo que los participantes ven en el video y lo que acaban de hacer en el ejercicio de diagnóstico es el mejor detonador de insight del curso.
              </p>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
