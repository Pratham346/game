class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.reset = createButton("reset");
    this.greeting = createElement("h2");
    this.title = createElement("h1");
  }
  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display() {
    this.title.html("The Pokemon Game");

  

    this.title.position(displayWidth / 2 - 200, 0);
    this.title.style("font-size","50px");
    this.title.style("color","black");
  


    this.input.position(displayWidth / 2 - 40, displayHeight / 2 - 80);
    this.button.position(displayWidth / 2 + 30, displayHeight / 2);
    this.reset.position(displayWidth - 100, 20);
    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      if (player.index === 1) {
        player.x = 200;
      } else {
        player.x = width - 200;
      }
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.position(displayWidth / 2 - 70, displayHeight / 4);
    });

    this.reset.mousePressed(() => {
      database.ref("players").remove();
      database.ref("/").update({
        gameState: 0,
        playerCount: 0,
        playerAtEnd: 0,
      });
    });
  }
}
