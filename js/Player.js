class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
  }

  getCount()
  {
    var c = database.ref("playerCount");
    c.on("value",function (data) {
      playerCount = data.val();
    })
  }

  updateCount(co)
  {
    database.ref("/").update({
      playerCount: co
    })
  }

  addPlayer()
  {
    var playerIndex = "players/player"+this.index;
    if (this.index == 1)
    {
      this.positionX = (width/2) - 100;
    } else {
      this.positionX = (width/2) + 100;
    }
    database.ref(playerIndex).set({ //.set() is able to create a location and then update
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    }) 
  }

  update()
  {
    var playerIndex = "players/player"+this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    })
  }

  getDistance()
  {
    var playerIndex = "players/player"+this.index;
    var dist = database.ref(playerIndex).on("value",data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    })
  }

  static getInfo()
  {
    var p = database.ref("players");
    p.on("value",function (data) {
      allPlayers = data.val();
    })
  }
}
