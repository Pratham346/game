class Player {
  constructor(){
    this.index = null;
    this.y=0;
    this.health = 350;
    this.name = null;
    this.chosen=null;
    this.x=0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  getCarsAtEnd(){
    var carsAtEndRef = database.ref('carsAtEnd');
   carsAtEndRef.on("value",(data)=>{
      carsAtEnd = data.val();
      
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  static updateCarsAtEnd(count){
    database.ref('/').update({
    carsAtEnd: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      y:this.y,
      x:this.x,
      health:this.health,
      chosen:this.chosen,
    

    });
  }
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

}
