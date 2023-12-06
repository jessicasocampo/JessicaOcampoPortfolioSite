// README
/*
<project>
Jessica Ocampo
jessicaocampo

INSTRUCTIONS
You must run away from the geese! You lose 1 hp when they hit you.
Collect 5 slices of bread to win.
You begin with 5 health, 0 branches & 0 bread slices.
Picking up bread gives you 1. 
Picking up health gives you 5 hp. 
Picking up branches gives you 5.
Once you lose health it is game over.

Use mouse pressed as a crosshair to hit the goose.
Use wasd as movement keys to walk around (w = up, s = down, a = left, d = right).
Use the key 1 to go to default crosshair (larger size). 
Use the key 2 to go to another crosshair (smaller size).
You can pick up the items, bread, health and branches by moving on top of them.

CODING QUALITY AND VISUAL DESIGN
This game has multiple accessible items to pick up an play around with.
You are able to use strategy within this game to make it most efficent.
It is a constant game that can keep players hooked.

It is nice and effective to have a status bar of all your items collected.
They are all custom made drawings made with light pastel colours.

The geese are fun and interactive. 
They attack, can be killed and respawn at random locations.
They also make a quack sound when they are hit.

VIDEO
<paste video URL here>

RELEASE
I, Jessica Ocampo, grant permission to CS 105 course staff to use
my Final Project program and video for the purpose of promoting CS 105.
*/

//canvas
let width = 800;
let height = 500;

//colours
let gray_rgb = 180;
let white_rgb = 255;

let red_r = 255;
let red_g = 0;
let red_b = 0;

let blue_r = 182;
let blue_g = 208;
let blue_b = 226;

let beige_r = 245;
let beige_g = 222;
let beige_b = 179;

let brown_r = 210;
let brown_g = 180;
let brown_b = 140;

let darkgreen_r = 108;
let darkgreen_g = 150;
let darkgreen_b = 35;

let lawngreen_r = 152;
let lawngreen_g = 251;
let lawngreen_b = 152;

//goose
let goose_x;
let goose_y;
let goose_speed = 1.5;

//student
let student_x;
let student_y;
let student_speed = 3;

//hp
let hp;
let hp_x;
let hp_y;

//branches
let branch;
let branch_x;
let branch_y;

//movement
let up;
let down;
let left;
let right;

//bread
let bread;
let bread_x;
let bread_y;

//img
let img_person;
let img_goose;

//sound
let quack;
let sound = false;

//crosshair
let crosshair_arr = [];
let i;

function preload() {
	img_person = loadImage("person.png");
	img_goose = loadImage("goose.png");
	quack = loadSound("quack.wav");
}

function setup() {
	createCanvas(width, height);

	//inital position
	student_x = width / 2;
	student_y = height / 2;
	goose_x = width / 2;
	goose_y = height / 2;
	
	//inital value
	branch = 0;
	bread = 0;
	hp = 6;
	
	// initialize crosshair lengths
	crosshair_arr[0] = 10;
	crosshair_arr[1] = 15;
	crosshair_arr[0] = true;
	
	//set movements to false
	up = false;
	down = false;
	left = false;
	right = false;
	
	//set accessible items at random positions
	branch_x = floor(random(0, width - 50));
	branch_y = floor(random(0, height - 50));

	bread_x = floor(random(0, width - 50));
	bread_y = floor(random(0, height - 50));

	hp_x = floor(random(0, width - 50));
	hp_y = floor(random(0, height - 50));
}

function draw() {
	//student movement conditional
	if (up) {
		student_y -= student_speed;
	}
	if (down) {
		student_y += student_speed;
	}
	if (right) {
		student_x += student_speed;
	}
	if (left) {
		student_x -= student_speed;
	}

	//student movement restictions conditional
	if (student_x > width) {
		student_x = width;
	}
	if (student_x < 0) {
		student_x = 0;
	}
	if (student_y > height) {
		student_y = height;
	}
	if (student_y < 0) {
		student_y = 0;
	}
	
	//make goose follow student conditional
	if (bread < 5 && hp > 0) {	
			if (goose_x > student_x){
				goose_x -= goose_speed;
			}
			if(goose_y > student_y) {
				goose_y -= goose_speed;
			}
			if(goose_x < student_x){
				goose_x += goose_speed;
			}
			if(goose_y < student_y) {
				goose_y += goose_speed;
			}
		}
	
	//to draw the base of the game
	background(lawngreen_r, lawngreen_g, lawngreen_b);
	draw_path();
	draw_pond();
	draw_bench(50); //draw 2
	draw_title();

	//to subtract health when student is hit (hit test)
	if (dist(student_x, student_y, goose_x, goose_y) < 50) {
		hp--;
		student_x = width / 2;
		student_y = height / 2;
		goose_x = width;
		goose_y = height;
	}

	//to pick up items (hit test)
	if (dist(student_x, student_y, branch_x, branch_y) < 50) {
		branch += 5;
		branch_x = floor(random(0, width - 50));
		branch_y = floor(random(0, height - 50));
	}
	if (dist(student_x, student_y, bread_x, bread_y) < 50) {
		bread += 1;
		bread_x = floor(random(0, width - 50));
		bread_y = floor(random(0, height - 50));
	}
	if (dist(student_x, student_y, hp_x, hp_y) < 50) {
		hp += 5;
		hp_x = floor(random(0, width - 50));
		hp_y = floor(random(0, height - 50));
	}

	//draw moveable players
	draw_student();
	draw_geese();
	
	//draw pick up items
	draw_bread();
	draw_branch();
	draw_health();

	//status bar
	draw_status();

	//draw win or lose
	draw_gameover();
	draw_gamewin();
	
	//crosshair for mouse
	crosshair();
}

function draw_bench(bench_x) {
	//loop to draw two benches
		for (let i = 0; i < 2; i++) {
		//support
		noStroke();
		fill(gray_rgb);
		rect(bench_x + 10, 65, 5, 35);
		rect(bench_x + 115, 65, 5, 35);
		
		//base
		fill(beige_r, beige_g, beige_b);
		rect(bench_x, 50, 130, 8);
		rect(bench_x, 65, 130, 15);
		rect(bench_x, 85, 130, 15);
			
		//nails
		fill(gray_rgb);
		rect(bench_x + 10, 65, 5, 5);
		rect(bench_x + 115, 65, 5, 5);
		rect(bench_x + 10, 95, 5, 5);
		rect(bench_x + 115, 95, 5, 5);
		
		//move bench to the other side
		bench_x += 575;
	}
}

function draw_path() {
	strokeWeight(100);
	stroke(gray_rgb + 30); 
	noFill();
	bezier(width / 5, height, width / 8, height / 4, width, height, width, height / 5); 
}

function draw_pond() {
	noStroke();
	fill(blue_r, blue_g, blue_b);
	bezier(300, height, 400, 370, height, 375, width, 400); 
	triangle(width, 400, 300, height, width, height);
}

function draw_title() {
	if (hp > 0) {
		fill(white_rgb);
		stroke(gray_rgb);
		strokeWeight(5);
		textSize(25);
		textAlign(CENTER);
		text("Stay Away From The Geese.", width / 2, height / 12);
		textSize(20);
		text("Collect 5 Slices of Bread To Win!", width / 2, height / 7);
	}
}

function draw_student() {
	noStroke();
	//load image of person
	image(img_person, student_x, student_y);
}

function draw_geese() {
	noStroke();
	//load image of goose
	image(img_goose, goose_x, goose_y);
}

function draw_bread() {
	stroke(brown_r, brown_g, brown_b);
	fill(beige_r, beige_g, beige_b);
	rect(bread_x, bread_y, 50, 60);
	ellipse(bread_x + 25, bread_y, 60, 20);
	noStroke();
	rect(bread_x, bread_y, 50, 60);
}

function draw_branch() {
	stroke(brown_r, brown_g, brown_b);
	rect(branch_x, branch_y, 60, 5);
	line(branch_x + 15, branch_y + 15, branch_x + 30, branch_y + 5);
	line(branch_x - 15, branch_y - 15, branch_x + 20, branch_y + 2);
	noStroke();
	fill(darkgreen_r, darkgreen_g, darkgreen_b);
	ellipse(branch_x, branch_y + 5, 40, 10);
	ellipse(branch_x + 10, branch_y + 15, 8, 12);
	ellipse(branch_x - 10, branch_y - 15, 8, 12);
}

function draw_health() {
	stroke(gray_rgb);
	fill(white_rgb);
	rect(hp_x, hp_y, 60, 50);
	stroke(red_r, red_g, red_b);
	line(hp_x + 30, hp_y + 15, hp_x + 30, hp_y + 35);
	line(hp_x + 20, hp_y + 25, hp_x + 40, hp_y + 25);
}

function draw_status() {
	fill(white_rgb);
	stroke(gray_rgb);
	strokeWeight(5);
	textSize(20);
	textAlign(LEFT);
	text("Health: " + hp, 20, height - 85);
	text("Branch Pile: " + branch, 20, height - 60);
	text("The Amount Of Bread Found: " + bread, 20, height - 35);
}

function draw_gameover() {
	if (hp <= 0) {
		background(lawngreen_r, lawngreen_g, lawngreen_b);
		stroke(gray_rgb);
		fill(white_rgb);
		textSize(50);
		textAlign(CENTER);
		text("Game Over.", width / 2, height / 2);
		textSize(25);
		text("Click to Restart.", width / 2, height / 2 + 100);
	}
}

function draw_gamewin() {
	if (bread == 5) {
		background(lawngreen_r, lawngreen_g, lawngreen_b);
		stroke(gray_rgb);
		fill(white_rgb);
		textSize(80);
		textAlign(CENTER);
		text("You Win.", width / 2, height / 2);
	}
}

function crosshair() {
	//array to access two types of crosshair
	if(crosshair_arr[0] === true){
		i = 0;
		stroke(white_rgb);
		strokeWeight(2);
		noFill();
		ellipse(mouseX, mouseY, 25 + crosshair_arr[i], 25 + crosshair_arr[i]);
	} else { (crosshair_arr[1] === true)
		i = 1;
		stroke(white_rgb);
		strokeWeight(2);
		noFill();
		ellipse(mouseX, mouseY, 10 + crosshair_arr[i], 10 + crosshair_arr[i]);
	}
}

function mousePressed() {
  if (hp <= 0) {
    hp = 5;
    branch = 5;
    bread = 0;
    student_x = width / 2;
    student_y = height / 2;
    goose_x = width;
    goose_y = height;
  }
	
	//when goose is hit, subtract branch amount (hit test)
  if (bread <= 5 && hp > 0) {
    if (branch > 0) {
    if (dist(mouseX, mouseY, goose_x, goose_y) < 50) {
      goose_x = floor(random(0, width / 2));
      goose_y = floor(random(0, height/2));
      branch --;
			
			//play quack sound when clicked
			quack.play();
    }
  	} 
	}
}

function keyReleased() {
  if (bread <= 5 && hp > 0) {
    if (key === 'w') {
			up = false;
		}
    if (key === 's') {
			down = false;
		}
		 if (key === 'd') {
			right = false;
		}
    if (key === 'a') {
			left = false;
		}
	}
}

function keyPressed() {
  if (bread <= 5 && hp > 0) {
    if (key === 'w') {
			up = true;
		}
    if (key === 's') {
			down = true;
		}
		if (key === 'd') {
			right = true;
		}
    if (key === 'a') {
			left = true;
		}
		}  
	if (key === '1') {
		crosshair_arr[0] = true;
		crosshair_arr[1] = false;
	}
	else if (key === '2') {
		crosshair_arr[1] = true;
		crosshair_arr[0] = false;
	}
}