class Player {
  constructor() {
    this.index = null;

    
   this.y = height/2;

    this.health = 350;
    this.name = null;
    this.weaponActive = false;
    this.chosen = null;
    this.x = 0;
    this.state = "ready";
    this.weaponX = null;
    this.weaponY = null;
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  getPlayerAtEnd() {

    var  playerAtEndRef = database.ref("playerAtEnd");

    playerAtEndRef.on("value", (data) => {
      playerAtEnd = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count,
    });
  }

  static updatePlayerAtEnd(count) {
    database.ref("/").update({

      playerAtEnd : count,

    });
  }

  update() {
    var playerIndex = "players/player" + this.index;

    database.ref(playerIndex).update({

  
      name: this.name,
      y: this.y,
      x: this.x,
      health: this.health,
      chosen: this.chosen,
      weaponActive: this.weaponActive,
      weaponX: this.weaponX,
      weaponY: this.weaponY,
      state: this.state,
      // weapon: null,
    });
  }
  static getPlayerInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }
  updateEnemyHealth(index, health) {
    var playerIndex = "players/player" + index;
    database.ref(playerIndex).update({
      health: health,
    });
    console.log(health + "updated");
  }
}
