const texto = `
A gente nunca soube o que éramos. Mas éramos.
No silêncio entre uma frase e outra,
nos olhos que desviavam, mas diziam.
Nos medos que tremiam por dentro e, ainda assim, ficavam.

Éramos o tipo de história que ninguém explica,
mas todo mundo sente,
como uma música triste que toca onde não tem som.

Se até o que não foi consegue doer tanto assim,
imagina o que seríamos... se tivesse sido.
Em qualquer lugar ou talvez em Londres,
a gente ainda é.

Mesmo que só em pensamento.
Mesmo que escondido no tempo onde ainda existimos.
Mesmo que ninguém saiba.
Mesmo que só a gente sinta.
`;

let i = 0;
const el = document.getElementById("poema");
const botao = document.getElementById("botao");
const bgMusic = document.getElementById("bgMusic");

function escrever() {
  if (i < texto.length) {
    el.innerHTML += texto.charAt(i);
    i++;
    setTimeout(escrever, 40);
  } else {
    botao.style.display = "inline-flex";
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log("Reprodução automática bloqueada"));
  }
}

function criarCoracoes() {
  const container = document.querySelector('.hearts');
  const heartCount = 15;
  
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-flutuante';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(heart);
  }
}

function animarFundo() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 2,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      alpha: Math.random() * 0.7 + 0.3,
      color: `hsl(${Math.random() * 30 + 330}, 100%, ${Math.random() * 20 + 70}%)`
    });
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 0, 20, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width || p.x < 0) {
        p.speedX = -p.speedX;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

window.onload = () => {
  escrever();
  animarFundo();
  criarCoracoes();
  
  document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.className = 'heart-click';
    heart.innerHTML = '❤';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 1000);
  });
};