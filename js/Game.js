class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      background(bgImg);
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    player1 = createSprite(100, 200);
    player1.addImage(player1Img);
    player1.scale = 1.5;
    player2 = createSprite(300, 200);
    player2.addImage(player2Img);

    playerArray = [player1, player2];
    weapon1 = null;
    weapon2 = null;
    weapons = [weapon1, weapon2];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getPlayerAtEnd();
    if (allPlayers !== undefined) {
      // background(rgb(198, 135, 103));
      background("white");
      push();
      noStroke();
      fill("#35C7F8");
      rect(0, -height * 4, width, height * 4.5);
      fill("#3C961A");
      rect(0, height * 0.5, width, height * 4.5);
      pop();
      image(bgImg, 0,0, width, height);
      var index = 0;

      //x and y position of the playerArray
      var x = 200;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the playerArray a little away from each other in x direction
        if (index === 1) {
          x = 200;
        } else {
          x = x + width - 400;
        }

        y = allPlayers[plr].y;
        playerArray[index - 1].x = x;
        playerArray[index - 1].y = y;

        stroke(50);
        fill("white");
        text(allPlayers[plr].health, x, y - 200);
        text(allPlayers[plr].score, x, y - 250);
        if (index === player.index) {
          stroke(10);
          fill("red");
          rect(x, y, 5, 5);
         
          player.health = allPlayers[plr].health;
          console.log(player.health);
          camera.position.x = displayWidth / 2;
          camera.position.y = playerArray[index - 1].y;
          //destroy weapon if out of screen
          if (weapons[index - 1]) {
            weapons[index - 1].body.x += weapons[index - 1].velocityX;

            player.weaponX = weapons[index - 1].body.x;
            player.weaponY = weapons[index - 1].body.y;
            player.update();
            if (
              weapons[index - 1].body.x >= width ||
              weapons[index - 1].body.x <= 0
            ) {
              weapons[index - 1].body.destroy();
              weapons[index - 1] = null;
              player.weaponActive = false;
              player.update();
              player.state = "ready";
            }
            //make weapon move and update coordinated to db
            //console.log( weapons[index - 1].x+","+ weapons[index - 1].velocity)
          }
        } else if (player.index != index) {
          //destroy weapon if touches enemy

          if (
            weapons[player.index - 1] &&
            weapons[player.index - 1].body.isTouching(playerArray[index - 1])
          ) {
            var health =
              allPlayers[plr].health - weapons[player.index - 1].damage;
            weapons[player.index - 1].body.destroy();
            weapons[player.index - 1] = null;
            console.log("destroy weapon after hit");
            player.updateEnemyHealth(index, health);
            console.log("update" + health);
            player.state = "ready";
            player.weaponActive = false;
            player.update();
          }
          //reading and updating enemy weapon position
          if (weapons[index - 1]) {
            weapons[index - 1].body.x = allPlayers[plr].weaponX;
            weapons[index - 1].body.y = allPlayers[plr].weaponY;
          }
        }
        if (weapons[index - 1] && !allPlayers[plr].weaponActive) {
          weapons[index - 1].body.destroy();
          weapons[index - 1] = null;
          // player.state = "ready";
        }

        //createWeapons

        if (
          !weapons[index - 1] &&
          allPlayers[plr].weaponActive &&
          allPlayers[plr].state == "thrown"
        ) {
          //console.log("create weapon");
          if (allPlayers[plr].chosen == "Fire Beam") {
            weapons[index - 1] = new Weapon(x, y, 60, firebeamImg, 10, 1);



            //weapon1_created = true;
            //player.state = "attack";
          }

          if (allPlayers[plr].chosen == "Fire Blast") {
            weapons[index - 1] = new Weapon(x, y, 80, fireblastImg, 10, 1);
            //weapon1_created = true;
            //player.state = "attack";
          }
          if (allPlayers[plr].chosen == "Incinerate") {
            weapons[index - 1] = new Weapon(x, y, 90, incinerateImg, 10, 0.5);
            weapons[index - 1].scale = 0.05;
            //player.state = "attack";

            //weapon1_created = true;
          }

          //player.weapon = weapon1;

          if (allPlayers[plr].chosen == "Fire Spin") {
            weapons[index - 1] = new Weapon(x, y, 90, firespinImg, -10, 1);
            //player.state = "attack";

            // weapon2_created = true;
          }
          if (allPlayers[plr].chosen == "Flame Thrower") {
            weapons[index - 1] = new Weapon(x, y, 80, flamethrowerImg, -10, 1);
            //player.state = "attack";

            //weapon2_created = true;
          }

          if (allPlayers[plr].chosen == "Slash") {
            weapons[index - 1] = new Weapon(x, y, 60, slashImg, -10, 1);
            //player.state = "attack";

            // weapon2_created = true;
          }
          // player.weapon = weapons[player.index - 1];
        }
        //player.weapon = weapon2;

        //showChosenWeapon
        if (allPlayers[plr].weaponActive) {
          if (allPlayers[plr].chosen == "Fire Beam") {
            image(firebeamImg, x, y + 200, 20, 20);
          }
          if (allPlayers[plr].chosen == "Fire Spin") {
            image(firespinImg, x, y + 200, 20, 20);
          }
          if (allPlayers[plr].chosen == "Fire Blast") {
            image(fireblastImg, x, y + 200, 20, 20);
          }
          if (allPlayers[plr].chosen == "Flame Thrower") {
            image(flamethrowerImg, x, y + 200, 20, 20);
          }
          if (allPlayers[plr].chosen == "Incinerate") {
            image(incinerateImg, x, y + 200, 20, 20);
          }
          if (allPlayers[plr].chosen == "Slash") {
            image(slashImg, x, y + 200, 20, 20);
          }
        }
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.y -= 10;
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {
      player.y += 10;
      player.update();
    }

    this.chooseWeapon();

    if (player.health <= 0) {
      // gameState = 2;
      this.update(2);
      Player.updatePlayerAtEnd(player.index);
      console.log("lossing Player" + player.index)
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");

    if (playerAtEnd == 1) {
      var bk = "bg_image/bg2.jpg";

    } else {
      var bk = "bg_image/bg1.jpg";
    }

    var backgroundimg = loadImage(bk);
    background(backgroundimg);

  }
  chooseWeapon() {
    if (player.state === "ready") {
      if (player.index === 1) {
        if (keyIsDown(87)) {
          player.chosen = "Fire Beam";
          player.state = "thrown";
          player.weaponActive = true;
        }
        if (keyIsDown(65)) {
          player.chosen = "Fire Blast";
          player.state = "thrown";
          player.weaponActive = true;
        }
        if (keyIsDown(68)) {
          player.chosen = "Incinerate";
          player.state = "thrown";
          player.weaponActive = true;
        }
        player.update();
      }
      if (player.index === 2) {
        if (keyIsDown(87)) {
          player.chosen = "Fire Spin";
          player.state = "thrown";
          player.weaponActive = true;
        }
        if (keyIsDown(65)) {
          player.chosen = "Flame Thrower";
          player.state = "thrown";
          player.weaponActive = true;
        }
        if (keyIsDown(68)) {
          player.chosen = "Slash";
          player.state = "thrown";
          player.weaponActive = true;
        }

        player.update();
      }
    }
  }
}
