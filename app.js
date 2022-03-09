let balls = [];
let speed = 7;
let coll = false;
let gravity = false;
let r = document.getElementById("btn");
let s = document.getElementById("btn2");
r.style.backgroundColor='green';
s.style.backgroundColor='green';
function setup(){
  createCanvas(windowWidth,windowHeight);
  background(175);
  let b1 = new Ball();
  //balls.push(b1);
  b1.spawnRandom(1,speed,balls);
  //b1.createBoundary(100,100,7,width/8,width/8);
  b1.createBoundary(width*0.75,height*0.25,6,width/8,width/8);
}
function draw(){

  background(0,0,0,10);
  for(i=0;i<balls.length;i++){
    balls[i].show();
    if(gravity){
    balls[i].applyGravity();
    }
  }
  if(coll){
    balls[0].checkCollision(balls);
  }
}
function toggle(){
  coll= coll?false:true;
  btn.innerText = btn.innerText=="Start"?"Stop":"Start";
  btn.style.backgroundColor = btn.style.backgroundColor=="green"?"deeppink":"green";
 }
 function toggleGrav(){
  gravity= gravity?false:true;
  btn2.style.backgroundColor = btn2.style.backgroundColor=="green"?"deeppink":"green";
 }
