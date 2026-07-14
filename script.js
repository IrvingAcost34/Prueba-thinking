// ---------- Ambient neural particle field ----------
const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');
let W, H, particles;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize(){
  W = canvas.width = window.innerWidth * devicePixelRatio;
  H = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
}
window.addEventListener('resize', resize);
resize();

const COUNT = reduceMotion ? 0 : Math.min(60, Math.floor(window.innerWidth/22));
const colors = ['155,107,255', '78,161,255', '239,232,255'];

function makeParticles(){
  particles = [];
  for(let i=0;i<COUNT;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      vx: (Math.random()-0.5)*0.18*devicePixelRatio,
      vy: (Math.random()-0.5)*0.18*devicePixelRatio,
      r: (Math.random()*1.6+0.6)*devicePixelRatio,
      c: colors[Math.floor(Math.random()*colors.length)]
    });
  }
}
makeParticles();
window.addEventListener('resize', makeParticles);

function tick(){
  ctx.clearRect(0,0,W,H);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
  }
  for(let i=0;i<particles.length;i++){
    const a = particles[i];
    ctx.beginPath();
    ctx.fillStyle = `rgba(${a.c},0.8)`;
    ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
    ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const b = particles[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      const maxDist = 140*devicePixelRatio;
      if(dist < maxDist){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${a.c},${(1-dist/maxDist)*0.18})`;
        ctx.lineWidth = 1*devicePixelRatio;
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  if(!reduceMotion) requestAnimationFrame(tick);
}
if(!reduceMotion) requestAnimationFrame(tick);
else ctx.clearRect(0,0,W,H);

// ---------- Parallax tilt ----------
const orbit = document.getElementById('logoOrbit');
const stage = document.getElementById('stage');

if(!reduceMotion){
  stage.addEventListener('mousemove', (e)=>{
    const rect = stage.getBoundingClientRect();
    const px = (e.clientX - rect.left)/rect.width - 0.5;
    const py = (e.clientY - rect.top)/rect.height - 0.5;
    orbit.style.transform = `rotateY(${px*14}deg) rotateX(${-py*14}deg)`;
  });
  stage.addEventListener('mouseleave', ()=>{
    orbit.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

// ---------- Click: thought pulse ----------
const hemis = document.getElementById('hemis');
let toggle = false;
document.getElementById('logoWrap').addEventListener('click', ()=>{
  toggle = !toggle;
  hemis.classList.remove('fire','b');
  void hemis.offsetWidth; // restart animation
  hemis.classList.add('fire');
  if(toggle) hemis.classList.add('b');

  // extra ring burst
  const burst = document.createElement('div');
  burst.className = 'ring';
  burst.style.animation = 'ringPulse 1.1s ease-out forwards';
  burst.style.borderColor = 'rgba(255,255,255,0.5)';
  document.querySelector('.rings').appendChild(burst);
  setTimeout(()=> burst.remove(), 1200);
});
