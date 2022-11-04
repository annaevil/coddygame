var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "https://abrakadabra.fun/uploads/posts/2022-01/1642608884_1-abrakadabra-fun-p-bekgraund-dlya-igri-2.jpg";
fg.src = "img/fg.png";
pipeUp.src = "img/up.png";
pipeBottom.src = "img/down.png";

// bird = setTimeout(() => bird = clearTimeout(bird), 1000);
var fly = new Audio(); 
var score_audio = new Audio();

fly.src = "audio/fly.mp3"; 
score_audio.src = "audio/score.mp3"; 

startBtn.addEventListener("click", (event) => {
    event.preventDefault()
    screens[0].classList.add("up")
})

var gap = 90;


document.addEventListener("keypress", moveUp);



function moveUp() {
    yPos -= 25;
    fly.play();
}


var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;

// позиция птички

var xPos = 30;
var yPos = 30;
var grav = 1.5;




function draw() {
    
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    
        pipe[i].x--;

        if(pipe[i].x == 400) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }

        if (pipe.length > 2){
            pipe.shift()
        }
    }
   
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт:" + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;