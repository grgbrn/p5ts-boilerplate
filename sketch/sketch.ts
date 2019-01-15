// Demonstration of multiple force acting on
// bodies (Mover class)
// Bodies experience gravity continuously
// Bodies experience fluid resistance when in "water"

// Five moving bodies
let movers: Mover[] = [];

// Liquid
var liquid: Liquid;

function setup() {
  createCanvas(640, 360);
  reset();
  // Create liquid object
  liquid = new Liquid(0, height/2, width, height/2, 0.1);
}

function draw() {
  background(127);
  
  // Draw water
  liquid.display();

  for (var i = 0; i < movers.length; i++) {
    
    // Is the Mover in the liquid?
    if (liquid.contains(movers[i])) {
      // Calculate drag force
      var dragForce = liquid.calculateDrag(movers[i]);
      // Apply drag force to Mover
      movers[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    var gravity = createVector(0, 0.1*movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);
   
    // Update and display
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
  
}


function mousePressed() {
  reset();
}

// Restart all the Mover objects randomly
function reset() {
  for (var i = 0; i < 9; i++) {
    movers[i] = new Mover(random(0.5, 3), 40+i*70, 0);
  }
}

class Liquid {

  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public c: number) {
      // nothing to do because of ts magic!
    }

    // is the Mover in the liquid?
    contains(m: Mover): boolean {
      const l = m.position;
      return l.x > this.x && l.x < this.x + this.w &&
             l.y > this.y && l.y < this.y + this.h;
    }

    calculateDrag(m: Mover): p5.Vector {
      var speed = m.velocity.mag();
      var dragMagnitude = this.c * speed * speed;
    
      // Direction is inverse of velocity
      var dragForce = m.velocity.copy();
      dragForce.mult(-1);
      
      // Scale according to magnitude
      // dragForce.setMag(dragMagnitude);
      dragForce.normalize();
      dragForce.mult(dragMagnitude);
      return dragForce;
    }

    display() {
      noStroke();
      fill(50);
      rect(this.x, this.y, this.w, this.h);
    }
}

class Mover {
  x: number
  y: number
  mass: number
  position: p5.Vector
  velocity: p5.Vector
  acceleration: p5.Vector

  constructor(m: number, x: number, y: number) {
    this.mass = m
    this.x = x
    this.y = y
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
  }

  applyForce(force: p5.Vector) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255,127);
    ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
  }

  checkEdges() {
    if (this.position.y > (height - this.mass*8)) {
      // A little dampening when hitting the bottom
      this.velocity.y *= -0.9;
      this.position.y = (height - this.mass*8);
    }
  }
}
