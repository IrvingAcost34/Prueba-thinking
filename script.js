// =========================
// THINKING WEBSITE SCRIPT
// =========================

// BOTÓN LOGIN

const loginBtn = document.querySelector(".login-btn");

if(loginBtn){
    loginBtn.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
}

// BOTÓN SIGN UP

const signupBtn = document.querySelector(".signup-btn");

if(signupBtn){
    signupBtn.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
}

// BOTÓN START ASSESSMENT

const startBtn = document.querySelector(".start-btn");

if(startBtn){
    startBtn.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
}

// BOTÓN EXPLORE TECHNIQUES

const exploreBtn = document.querySelector(".explore-btn");

if(exploreBtn){
    exploreBtn.addEventListener("click", () => {

        const learningSection =
        document.getElementById("learning-styles");

        if(learningSection){

            learningSection.scrollIntoView({
                behavior:"smooth"
            });

        }

    });
}

// LOGO THINKING

const brand = document.querySelector(".brand");

if(brand){

    brand.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

// =========================
// MENU NAVIGATION
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});
// =========================
// THEME TOGGLE
// =========================

const themeBtn =
document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    const currentTheme =
    document.documentElement.getAttribute(
        "data-theme"
    );

    if(currentTheme === "dark"){

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        themeBtn.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }else{

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeBtn.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
});

// =========================
// LOAD SAVED THEME
// =========================

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    if(savedTheme === "dark"){

        themeBtn.innerHTML = "☀️";
    }
}
// =========================
// BOMBI CHAT
// =========================

const bombiBtn =
document.getElementById("bombi-btn");

const bombiChat =
document.getElementById("bombi-chat");

const closeChat =
document.getElementById("close-chat");

if(bombiBtn){

    bombiBtn.addEventListener("click", () => {

        bombiChat.style.display = "block";

    });

}

if(closeChat){

    closeChat.addEventListener("click", () => {

        bombiChat.style.display = "none";

    });

}
/* ==========================
   NAVBAR SCROLL
==========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
/* ==========================
   THINKING STARFIELD
==========================*/

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let meteors = [];
let lightParticles = [];

let scrollOffset = 0;
let nebulaOffset = 0;

// ==========================
// CANVAS SIZE
// ==========================

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();

    if(typeof createLightParticles === "function"){

        createLightParticles();

    }

});

// ==========================
// SCROLL
// ==========================

window.addEventListener("scroll", () => {

    scrollOffset = window.scrollY;

});

// ==========================
// STAR COLORS
// ==========================

function randomColor(){

    const colors = [

        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#8c52ff",
        "#00c2ff"

    ];

    return colors[Math.floor(Math.random()*colors.length)];

}

// ==========================
// CREATE STARS
// ==========================

function createStars(){
    stars = [];
    for(let i=0;i<600;i++){
        let layer;
        if(i<350){
            layer=1;
        }else if(i<520){
            layer=2;
        }else{
            layer=3;
        }
        stars.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height*5,
            radius:
                layer===1
                ?Math.random()*1.2+.2
                :layer===2
                ?Math.random()*2+.8
                :Math.random()*3+1.5,
            speed:
                layer===1
                ?0.12
                :layer===2
                ?0.28
                :0.45,
            alpha:Math.random(),
            twinkle:(Math.random()*0.01)+0.002,
            color:randomColor(),
            layer
        });
    }
}
createStars();

// ==========================
// LIGHT MODE PARTICLES
// (burbujas de luz moradas/celestes para el fondo blanco)
// ==========================

function createLightParticles(){

    lightParticles = [];

    const palette = [
        "rgba(140,82,255,.45)",
        "rgba(0,194,255,.40)",
        "rgba(120,100,255,.35)",
        "rgba(140,82,255,.25)",
        "rgba(0,194,255,.22)"
    ];

    for(let i=0;i<70;i++){

        let layer;

        if(i<35){
            layer=1;
        }else if(i<55){
            layer=2;
        }else{
            layer=3;
        }

        lightParticles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height*5,
            radius:
                layer===1
                ?Math.random()*3+1.5
                :layer===2
                ?Math.random()*8+4
                :Math.random()*20+12,
            speed:
                layer===1
                ?0.12
                :layer===2
                ?0.22
                :0.35,
            alpha:Math.random()*0.4+0.15,
            maxAlpha:layer===3?0.35:0.75,
            twinkle:(Math.random()*0.006)+0.002,
            color:palette[Math.floor(Math.random()*palette.length)],
            seed:Math.random()*1000,
            layer
        });
    }
}
createLightParticles();

// ==========================
// METEORS
// ==========================

setInterval(()=>{

    if(document.documentElement.getAttribute("data-theme") !== "dark") return;

    meteors.push({

        x: Math.random()*canvas.width,

        y: -100,

        length: 120 + Math.random()*80,

        speed: 10 + Math.random()*4,

        opacity: 1

    });

},5000);

// ==========================
// MOUSE (necesario antes de dibujar,
// drawConstellations y drawLightParticles lo usan)
// ==========================

const mouse = {

    x: -9999,
    y: -9999

};

window.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave",()=>{

    mouse.x = -9999;
    mouse.y = -9999;

});

// ==========================
// DRAW
// ==========================

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
  nebulaOffset += 0.15;

// Nebulosa morada

let gradient1 = ctx.createRadialGradient(

    canvas.width*0.25 + Math.sin(nebulaOffset*0.01)*80,

    canvas.height*0.30,

    50,

    canvas.width*0.25,

    canvas.height*0.30,

    500

);

const pulse1 = 0.10 + Math.sin(nebulaOffset*0.02) * 0.04;

gradient1.addColorStop(0,`rgba(140,82,255,${pulse1})`);
gradient1.addColorStop(1,"rgba(140,82,255,0)");

ctx.fillStyle = gradient1;
ctx.fillRect(0,0,canvas.width,canvas.height);

// Nebulosa azul

let gradient2 = ctx.createRadialGradient(

    canvas.width*0.80 + Math.cos(nebulaOffset*0.008)*100,

    canvas.height*0.70,

    80,

    canvas.width*0.80,

    canvas.height*0.70,

    600

);

const pulse2 = 0.08 + Math.cos(nebulaOffset*0.018) * 0.035;

gradient2.addColorStop(0,`rgba(0,194,255,${pulse2})`);
gradient2.addColorStop(1,"rgba(0,194,255,0)");

ctx.fillStyle = gradient2;
ctx.fillRect(0,0,canvas.width,canvas.height);

    if(document.documentElement.getAttribute("data-theme") !== "dark"){

        drawLightParticles();

        requestAnimationFrame(drawStars);

        return;

    }

    // ---------- STARS ----------

    stars.forEach(star=>{

        star.alpha += star.twinkle;

        if(star.alpha > 1 || star.alpha < 0.2){

            star.twinkle *= -1;

        }

        const totalHeight = canvas.height * 5;

        const y = ((star.y - scrollOffset * star.speed) % totalHeight + totalHeight) % totalHeight;
        

        ctx.beginPath();

        ctx.arc(

            star.x,

            y,

            star.radius,

            0,

            Math.PI*2

        );

        ctx.fillStyle = star.color;

        ctx.shadowBlur = star.radius*10;

        ctx.shadowColor = star.color;

        ctx.globalAlpha = star.alpha;

        ctx.fill();

        ctx.globalAlpha = 1;

    });

    // ---------- CONSTELLATIONS ----------

    drawConstellations();

    // ---------- METEORS ----------

    meteors.forEach((meteor,index)=>{

        ctx.beginPath();

        ctx.moveTo(meteor.x, meteor.y);

        ctx.lineTo(

            meteor.x - meteor.length,

            meteor.y - meteor.length

        );

        ctx.strokeStyle = `rgba(255,255,255,${meteor.opacity})`;

        ctx.lineWidth = 1 + Math.random()*2;

        ctx.shadowBlur = 45;

        ctx.shadowColor = "#ffffff";

        ctx.stroke();

        meteor.x += meteor.speed;

        meteor.y += meteor.speed;

        meteor.opacity -= 0.01;

        if(meteor.opacity <= 0){

            meteors.splice(index,1);

        }

    });

    requestAnimationFrame(drawStars);

}

drawStars();
/* ==========================
   THINKING STARFIELD PHASE 5
==========================*/
function drawConstellations(){

    if(document.documentElement.getAttribute("data-theme") !== "dark") return;

    const totalHeight = canvas.height * 5;

    for(let i=0;i<stars.length;i++){

        const star = stars[i];

        const x1 = star.x;

        const y1 = ((star.y - scrollOffset * star.speed) % totalHeight + totalHeight) % totalHeight;

        const distanceMouse = Math.hypot(

            mouse.x-x1,

            mouse.y-y1

        );

        if(distanceMouse>180) continue;

        for(let j=i+1;j<stars.length;j++){

            const star2 = stars[j];

            const x2 = star2.x;

            const y2 = ((star2.y - scrollOffset * star2.speed) % totalHeight + totalHeight) % totalHeight;

            const distance = Math.hypot(

                x2-x1,

                y2-y1

            );

            if(distance<80){

                ctx.beginPath();

                ctx.moveTo(x1,y1);

                ctx.lineTo(x2,y2);

                ctx.strokeStyle="rgba(255,255,255,.15)";

                ctx.lineWidth=.6;

                ctx.stroke();

            }

        }

    }

}
function drawLightParticles(){

    const totalHeight = canvas.height * 5;

    // ---------- BURBUJAS ----------

    lightParticles.forEach(p=>{

        p.alpha += p.twinkle;

        if(p.alpha > p.maxAlpha || p.alpha < 0.08){

            p.twinkle *= -1;

        }

        const y = ((p.y - scrollOffset * p.speed) % totalHeight + totalHeight) % totalHeight;

        const x = p.x + Math.sin((y + p.seed) * 0.002) * 25;

        ctx.beginPath();

        ctx.arc(x, y, p.radius, 0, Math.PI*2);

        ctx.fillStyle = p.color;

        ctx.shadowBlur = p.radius * 1.4;

        ctx.shadowColor = p.color;

        ctx.globalAlpha = p.alpha;

        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.shadowBlur = 0;

    });

    // ---------- LÍNEAS SUAVES CERCA DEL CURSOR ----------

    for(let i=0;i<lightParticles.length;i++){

        const p1 = lightParticles[i];

        const y1 = ((p1.y - scrollOffset * p1.speed) % totalHeight + totalHeight) % totalHeight;
        const x1 = p1.x + Math.sin((y1 + p1.seed) * 0.002) * 25;

        const distanceMouse = Math.hypot(mouse.x - x1, mouse.y - y1);

        if(distanceMouse > 220) continue;

        for(let j=i+1;j<lightParticles.length;j++){

            const p2 = lightParticles[j];

            const y2 = ((p2.y - scrollOffset * p2.speed) % totalHeight + totalHeight) % totalHeight;
            const x2 = p2.x + Math.sin((y2 + p2.seed) * 0.002) * 25;

            const distance = Math.hypot(x2 - x1, y2 - y1);

            if(distance < 170){

                ctx.beginPath();

                ctx.moveTo(x1, y1);

                ctx.lineTo(x2, y2);

                ctx.strokeStyle = "rgba(140,82,255,.15)";

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }

}

const progressText = document.querySelector(".progress-circle span");

if(progressText){

    const values = ["20%","45%","75%","90%"];

    let index = 0;

    setInterval(()=>{

        index++;

        if(index >= values.length){

            index = 0;

        }

        progressText.textContent = values[index];

    },1000);

}
const discoverBtn = document.getElementById("discover-btn");

if(discoverBtn){

    discoverBtn.addEventListener("click",()=>{

        window.location.href="Login.html";

    });

}

/* ==========================
   REVEAL ON SCROLL
   (animación de entrada consistente para todas
   las tarjetas de la página)
==========================*/

const revealTargets = document.querySelectorAll(
    ".learning-card, .technique-card, .about-card, .why-card, .info-card"
);

revealTargets.forEach((el, i) => {

    el.classList.add("reveal");

    el.style.transitionDelay = (i % 3) * 0.12 + "s";

});

if("IntersectionObserver" in window){

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));

}else{

    // Fallback: si el navegador no soporta IntersectionObserver, mostrar todo directamente
    revealTargets.forEach(el => el.classList.add("active"));

}
