let meteorSpeed = 7;

const sound = document.getElementById("gameSound");
let musicStarted = false;



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "assets/img.png";

const meteorImg = new Image();
meteorImg.src = "assets/Meteor.png";


let player = { x: 100, y: 100, width: 100, height: 100 };
let meteors = [
  { x: 1000, y: randY() },
  { x: 2000, y: randY() },
  { x: 3000, y: randY() },
  { x: 4000, y: randY() },
];

function randY() {
  return Math.floor(Math.random() * 400);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w" && player.y > 0) player.y -= 20;
  if (e.key === "s" && player.y < canvas.height - player.height) player.y += 20;
  if (e.key === "d" && player.x < canvas.width - player.width) player.x += 20;
  if (e.key === "a" && player.x > 0) player.x -= 20;
});





function checkCollision(meteor) {

  return (
    player.x < meteor.x + 35 &&
    player.x + 30 > meteor.x &&
    player.y < meteor.y + 150 &&
    player.y + 40 > meteor.y
  );
}

function gameOver() {
  alert("Game Over");
  location.reload();
}

function draw() {
sound.play();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, player.x, player.y, 180, 90);
  meteors.forEach((m) => {
    ctx.drawImage(meteorImg, m.x, m.y, 190, 180);
    m.x -= meteorSpeed;
    if (checkCollision(m)) gameOver();
    if (m.x < -1500) {
      
      m.x = 1000 + Math.random() * 3000;
      m.y = randY();
    }

  

    
  });
  requestAnimationFrame(draw);
}

draw();



