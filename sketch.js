const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground ;
var zombie;
var zombie1, zombie2, zombie3, zombie4;
var backgroundImage,bg;
var tower, towerImage;
var stone,stoneImg,rope,rope2,rope3;
var stone_con;
var stone_con_2;
var stone_con_3;
var button;
var cut;
var colli,gameO;

var isGameOver = false;



function preload() {

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  backgroundImage = loadImage("./assets/bg.png");
 // bg = loadImage("background.gif");
  towerImage = loadImage("tower.png");
  stoneImg = loadImage('./assets/stone.png');
  sadImg = loadImage('sad_zombie.png')
  cut = loadSound("jump.wav");
  colli = loadSound("collision.mp3");
  gameO = loadSound("gameover.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Ground(600,550,1600,180);

  tower = Bodies.rectangle(90, 320, 160, 310, { isStatic: true });
  World.add(world, tower);


  rope = new Rope(8,{x:1000,y:50});
  rope2 = new Rope(6,{x:600,y:30});
  rope3 = new Rope(10,{x:300,y:200});


  stone = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,stone);
 
  stone_con = new Link(rope,stone);
  stone_con2 = new Link(rope2,stone);
  stone_con3 = new Link(rope3,stone);

  zombie = createSprite(windowWidth-10, 400);
  zombie.addAnimation("righttoleft",  zombie4, zombie3);
  zombie.addAnimation('sad',sadImg);
  zombie.scale = 0.06;
  zombie.velocityX = 7;

  button = createImg("cut_button.png");
  button.position(970,50);
  button.size(35,35);
  button.mouseClicked(drop);

  button2 = createImg('cut_button.png');
  button2.position(600,35);
  button2.size(35,35);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_button.png');
  button3.position(300,200);
  button3.size(35,35);
  button3.mouseClicked(drop3);

}


function draw() {
  background(backgroundImage);
  
  image(stoneImg,stone.position.x,stone.position.y,40,40);
  rope.show();
  rope2.show();
  rope3.show();
  
  
  Engine.update(engine);

  ground.show();


  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -0.9;
    zombie.changeAnimation("righttoleft");
  }

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  drawSprites();
  
 
  if(collide(stone,zombie)==true)
  {  
    zombie.changeAnimation("sad",sadImg);
    zombie.velocityX = 0;
    isGameOver = true;
    gameOver(); 
    colli.play();

  }

  if(collide(tower,zombie)==true)
  {  
    stone=null;
   console.log("tower loop executed")
    isGameOver = true;
    gameOver();
    colli.play();
  
  }

  }

function drop(){

  rope.break();
  stone_con.detach();
  stone_con = null;
  cut.play();
  
  }

function drop2(){

  rope2.break();
  stone_con2.detach();
  stone_con2 = null;
  cut.play();
 
}
  
function drop3(){

  rope3.break();
  stone_con3.detach();
  stone_con3 = null;
  cut.play();

}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
         //console.log(d)
         if(d<=90)
            {
              World.remove(engine.world,stone);
               stone = null;
               return true; 
            }
            else{
              return false;
            }
         }

}

function gameOver() {
  gameO.play();
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!!",
      imageUrl:
      "https://cdn-icons-png.flaticon.com/512/75/75454.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

