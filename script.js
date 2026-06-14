const START = new Date(2026, 4, 9); // 9 de mayo 2026
const hoy = new Date();  //da la fecha de hoy
const dia = hoy.getDate()  //me da el numero de dia en el que estamos

const messages = [
    { text: "Hay días que se vuelven sagrados sin que nadie los declare. El 9 de mayo fue uno de esos: el primer día de nosotros, el inicio de algo que vale la pena celebrar cada mes.", author: "— Desde el 9 de mayo ✦" },
    // { text: "Sabes una cosa mi vida❤️, eres muy bonita, eres muy hermosa quiero pasar todo el tiempo contigo pero ya no estoy estudiando mucho, cuando quiero intentarlo solo pienso en ti y la verdad me encantaria desirtelo en persona pero simplemente no puedo, 'llevo 4 horas escribiendo esto, va a estar disponible hasta las 11:00 PM del 8) pero eso te lo digo por aca y si no te contesto los mensajes algunos ratos es por que estoy tratando de estudiar, ahora tengo muchos pendientes y el poco tiempo que tengo te lo doy a ti. ESPERO QUE ENTIENDAS, TE AMO MAS DE LO QUE DEMUESTRO❤️. ", author: "— Si lo leiste enviame un '🤖'. ✦" },
    { text: "Cada mes que pasa es un capítulo más de algo bonito 📖✨. Cada vez que el calendario llega al 9 📅💖, es una razón para sonreír 😊🌸 y recordar que esto que construimos juntos sigue creciendo 🌱💞.", author: "— Celebrando cada aniversario ✦" },
    { text: "No hace falta esperar un mes para celebrar 🎉💫. Cada día contigo ya es una razón 🌞❤️.", author: "— Cada día contigo💓 ✦" },
    { text: "Los meses se van acumulando 📆✨ y con ellos los momentos 🌟, las risas 😂💫, los recuerdos 📸💖. Para siempre es una promesa grande 🌌💍, pero la vamos construyendo de apoquitos🌹📅❤️.", author: "— Para siempre, de a pocos ✦" }
];

function setMessage(i, el) {
    document.querySelectorAll('.moment-tag').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const card = document.getElementById('messageCard');
    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    setTimeout(() => {
        document.getElementById('messageText').textContent = messages[i].text;
        document.getElementById('messageAuthor').textContent = messages[i].author;
        card.style.transition = 'opacity 0.4s, transform 0.4s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 200);
}

function monthDiff(start, now) {
    let months = (now.getFullYear() - start.getFullYear()) * 12;
    months += now.getMonth() - start.getMonth();
    if (now.getDate() < 9) months -= 1;
    return Math.max(0, months);
}

function nextNinth() {
    const now = new Date();
    let y = now.getFullYear(), m = now.getMonth();
    let candidate = new Date(y, m, 9);
    if (now >= candidate) {
        m += 1;
        if (m > 11) { m = 0; y += 1; }
        candidate = new Date(y, m, 9);
    }
    return candidate;
}

const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function updateAll() {
    const now = new Date();
    const diff = now - START;
    const totalSec = Math.floor(Math.max(0, diff) / 1000);
    const days  = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins  = Math.floor((totalSec % 3600) / 60);
    const secs  = totalSec % 60;

    document.getElementById('cnt-days').textContent = days;
    document.getElementById('cnt-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cnt-minutes').textContent = String(mins).padStart(2,'0');
    document.getElementById('cnt-seconds').textContent = String(secs).padStart(2,'0');

    const meses = monthDiff(START, now);
    document.getElementById('mesNum').textContent = meses;
    document.getElementById('mesLabel').textContent = meses === 1 ? 'mes juntos' : 'meses juntos';

    const next = nextNinth();
    const msLeft = next - now;
    const dLeft = Math.ceil(msLeft / 86400000);
    const nextMes = monthNames[next.getMonth()];

    if (dia == 9) {
        document.getElementById('nextLabel').textContent = '✨ ¡Es hoy es hoy, feliz Aniversario';
    } else if (dia == 8) {
        document.getElementById('nextLabel').textContent = `Aniversario de ${nextMes} mañana`;
    } else {
        document.getElementById('nextLabel').textContent = `Aniversario de ${nextMes} es en ${dLeft} días`;
    }
}

updateAll();
setInterval(updateAll, 1000);

// Stars
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let stars = [], W, H;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

function initStars() {
    stars = [];
    for (let i = 0; i < 220; i++) {
        stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.4+0.3, speed: Math.random()*0.007+0.003, phase: Math.random()*Math.PI*2 });
    }
}

function animate(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
        const a = 0.25 + 0.65 * Math.abs(Math.sin(t*0.001*s.speed*120 + s.phase));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(240,210,150,${a*0.85})`; ctx.fill();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize(); initStars(); animate(0);

// Heart burst
document.getElementById('heartBtn').addEventListener('click', e => {
    const emojis = ['✨','💓','⭐','🌟','✦','💫','🌙','✨','💓','⭐','🌟','✦','💫','🌙','✨','💓','⭐','🌟','✦','💫','🌙','✨','💓','⭐','🌟','✦','💫','🌙','✨','💓','⭐','🌟','✦','💫','🌙','✨','💓','⭐','🌟','✦','💫','🌙'];
    for (let i = 0; i < 9; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        el.style.left = (e.clientX + (Math.random()-.5)*100) + 'px';
        el.style.top  = (e.clientY + (Math.random()-.5)*50) + 'px';
        el.style.animationDelay = (Math.random()*0.3) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    }
});

function toggleMenu() {
    document.getElementById("menue").classList.toggle("show");
}