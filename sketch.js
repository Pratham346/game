var canvas;

var playerArray=[];
var carsAtEnd=0;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

// Variable for background and winner Image

var bg, bgImg, bg1, bg1Img, bg2, bg2Img, winner, winnerImg;

// Variable for Player1

var player1, player1Img, firebeam, firebeamImg, fireblast, fireblastImg, incinerate, incinerateImg ;

// Variable for Player2

var player2, player2Img, firespin, firespinImg, flamethrower, flamethrowerImg, slash, slashImg;

function preload(){

// Loading Images for background and winner

  bgImg = loadImage("bg_images/bg.jpg");
  bg1Img = loadImage("bg_images/bg1.jpg");
  bg2Img = loadImage("bg_images/bg2.jpg");
  bgImg = loadImage("bg_images/bg.jpg");
  winnerImg = loadImage("bg_images/winner.png");

  // Loading Images for Player1 and player1 attacks

  player1Img = loadImage("p1/player_1.png");
  firebeamImg = loadImage("p1/Fire_beam.png");
  fireblastImg = loadImage("p1/Fire_blast.png");
  incinerateImg = loadImage("p1/Incinerate.png");

  // Loading Images for Player2 and player2 attacks

  player2Img = loadImage("p2/charizard.png");
  firespinImg = loadImage("p2/Fire_spin.png");
  flamethrowerImg = loadImage("p2/Flame_thrower.png");
  slashImg = loadImage("p2/slash.png");
}

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
