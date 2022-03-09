class Ball{
  constructor(posX,posY,velocityX,velocityY,color, radius){
    this.x = posX;
    this.y = posY;
    this.xVel = velocityX;
    this.yVel = velocityY;
    this.color = color;
    this.radius = radius;
    this.gravityX = 0;
    this.gravityY = 0;
    this.friction = 1;
  }
  createBoundary(height,width,size,startx,starty){
    for(let i=0;i<height;i+=size){
      for(let j = 0;j<width;j+=size){
        colorMode(HSL,100);
        let colr = color(j%100,255,50);
        let ball = new Ball(
          i+startx,
          j+starty,
          0,
          0,
          colr,
          size
          );
          balls.push(ball);
      }
    }
  }
  spawnRandom(x,balls){
    for(let i=0;i<x;i++){
    let colr = color(random(0,255),random(0,255),random(0,255));
  let ball = new Ball(floor(random(20,width-20)),floor(random(20,height-20)),random(5,5),random(5,5),colr,random(20,30));
    balls.push(ball);
    }
  }
    spawnRandom(x,speed,balls){
    for(let i=0;i<x;i++){
    let colr = color(random(0,255),random(0,255),random(0,255));
  let ball = new Ball(floor(random(20,width-20)),floor(random(20,height-20)),random(5,speed),random(5,speed),colr,random(20,30));
    balls.push(ball);
    }
  }
  mov(){
    if(this.x >= width-this.radius || this.x <=this.radius){
      this.xVel *= -1;
    this.xVel *= this.friction;
    }
    if(this.y > height-this.radius || this.y <= this.radius){
      this.yVel *= -1
    this.yVel *= this.friction;
    }
    
    this.x += (this.xVel+this.gravityX);
    this.y += (this.yVel+this.gravityY);
  }
  applyGravity(){
    this.friction= 0.9;
    if(this.y <=height){
    this.yVel +=0.4;
    }
      
  }
  //collision
  CalcVal(m1,m2,u1,u2,or){
         let v1 = (((m1-m2)/(m1+m2))*u1)+(((2*m2)/(m1+m2))*u2);
         let v2 = (((2*m1)/(m1+m2))*u1)+(((m2-m1)/(m1+m2))*u2);
         if(or==true){
           return v1;
         }else{
           return v2;
         }
  }
  Calcdist(balls,i,j){
    let rad = balls[i].radius;
    let rad2 = balls[j].radius;
       let ax = balls[i].x-rad;
        let ay = balls[i].y-rad;
        let bx = balls[j].x-rad2;
        let by = balls[j].y-rad2;
       // console.log(ax+" "+ay+" "+bx+" "+by);
        let dist = sqrt(Math.pow((bx-ax),2) + Math.pow((by-ay),2));
        return dist;
  }
 checkCollision(balls){
     for(let i = 0;i<=balls.length;i++){
      for(let j = i+1;j<balls.length;j++){
        let dist = this.Calcdist(balls,i,j);
       //console.log(Math.abs(dist));
        if(dist<= balls[i].radius && dist <= balls[j].radius){
         let m1 = balls[i].radius;
         let m2 = balls[j].radius;
         let u1x = balls[i].xVel;
         let u2x = balls[j].xVel;
         let u1y = balls[i].yVel;
         let u2y = balls[j].yVel;

         let nvx = this.CalcVal(m1,m2,u1x,u2x,true);
         let nvy = this.CalcVal(m1,m2,u1y,u2y,true);
         let mvx = this.CalcVal(m1,m2,u1x,u2x,false);
         let mvy = this.CalcVal(m1,m2,u1y,u2y,false);
         //change the position
         balls[i].xVel = nvx;
         balls[j].xVel = mvx;
         balls[i].yVel = nvy;
         balls[j].yVel = mvy;
          
        }
      }
    }
  }
  
  //end of collision
  show(){
   // console.log(this.x+" and "+this.y);
    fill(this.color);
    noStroke();
    circle(this.x,this.y,this.radius);
    this.mov();
  }
}