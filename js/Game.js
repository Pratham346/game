class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage(player1Img);
    player2 = createSprite(300,200);
    player2.addImage(player2Img);
    
   playerArray = [player1, player2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    //player.getplayerArrayAtEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the playerArray
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the playerArray a little away from each other in x direction
        if (index ===1)
        {
          x=200;
        //  player.x = x;
        }else{
          x = x + width - 400;
         // player.x = width - 200;
        }
        
        //use data form the database to display the playerArray in y direction
        y = allPlayers[plr].y;
        playerArray[index-1].x = x;
        playerArray[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x, y, 100, 100);
          camera.position.x = displayWidth/2;
          camera.position.y = playerArray[index-1].y;
        }
       if(playerArray[index-1].chosen == "Fire Beam"){
         console.log("image");
         image(firebeamImg, playerArray[index-1].x, playerArray[index-1].y + 200, 20, 20);
       }
       if(playerArray[index-1].chosen == "Fire Spin" ){
        console.log("image");
        image(firespinImg, playerArray[index-1].x, playerArray[index-1].y + 200, 20, 20);
      }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10;
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10;
      player.update();
    }
if(keyIsDown(87)){
      if (player.index === 1){
        player.chosen ="Fire Beam"
       var weapon = new Weapon(player.x, player.y, 30, firebeamImg, 10);
        player.update();
      }
      if (player.index === 2){
        player.chosen = "Fire Spin"
        var weapon = new Weapon(player.x, player.y, 50, firespinImg, -10);
        player.update();
      }
}
if(keyIsDown(65)){
  if (player.index === 1){
    player.chosen = "Fire Blast"
    var weapon = new Weapon(player.x, player.y, 60, fireblastImg, 10);
    player.update();
  }
  if (player.index === 2){
    player.chosen = "Flame Thrower"
    var weapon = new Weapon(player.x, player.y, 50, flamethrowerImg, -10);
    player.update();
  }
}
if(keyIsDown(83)){
  if (player.index === 1){
    player.chosen = "Incinerate"
    var weapon = new Weapon(player.x, player.y, 60, incinerateImg, 10);
    player.update();
  }
  if (player.index === 2){
    player.chosen = "Slash"
    var weapon = new Weapon(player.x, player.y, 50, slashImg, -10);
    player.update();
  }
}





    if(player.distance > 3860){
      gameState = 2;
     player.rank = 1+ playerArrayAtEnd;
      Player.updateplayerArrayAtEnd(player.rank);
player.update();
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);

    if(allPlayers !== undefined){
     background(rgb(198,135,103));
     // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the playerArray
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        
        index = index + 1 ;

        //position the playerArray a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the playerArray in y direction
        y = displayHeight - allPlayers[plr].distance;
        playerArray[index-1].x = x;
        playerArray[index-1].y = y;

        var element = createElement("h4");
        if (allPlayers[plr].rank != 0){
          
          element.position(displayWidth/2, allPlayers[plr].rank*40);
          element.html(allPlayers[plr].name + ":" + allPlayers[plr].rank);



        }

        if (index === player.index){
          element.style("color", "red" );
          stroke(10);
          fill("red");
          ellipse(x, y, 100, 100);
          camera.position.x = displayWidth/2;
          camera.position.y = playerArray[index-1].y;
        }else{
          element.style("color", "black");
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

   drawSprites();
  }

}
