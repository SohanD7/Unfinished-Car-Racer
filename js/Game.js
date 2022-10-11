class Game {
  constructor() 
  {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState()
  {
    var s = database.ref("gameState");
    s.on("value",function (data){
      gameState = data.val();
    })
  }

  updateState(count)
  {
    database.ref("/").update({
      gameState: count 
    })
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();
    car1 = createSprite(width/2-100, height-100);
    car1.addImage("car1",car1_img);
    car1.scale = 0.08;
    car2 = createSprite(width/2+100, height-100);
    car2.addImage("car2",car2_img);
    car2.scale = 0.08;
    cars = [car1,car2];
  }

  handleElements()
  {
    form.hide();
    form.titleImg.position(40,40);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.position(width/2+150,40);
    this.resetTitle.class("resetText");

    this.resetButton.position(width/2+180,100);
    this.resetButton.class("resetButton");

    this.leadboardTitle.html("Leaderboard");
    this.leadboardTitle.class("resetText");
    this.leadboardTitle.position(width/3-70,40);

    this.leader1.class("leadersText");
    this.leader1.position(width/3-80,80);

    this.leader2.class("leadersText");
    this.leader2.position(width/3-80,130);
  }

  handlePlayerControl()
  {
    if (keyIsDown(UP_ARROW))
    {
      player.positionY += 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.positionX > width/3)
    {
      player.positionX -= 5;
      player.update();
    }
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width/2+150)
    {
      player.positionX += 5;
      player.update();
    }
  }

  handleResetButton()
  {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      })
      window.location.reload();
    })
  }

  showLeaderboard()
  {
    var leader1,leader2;
    var players = Object.values(allPlayers);
    console.log(players);
    if ((players[0].rank==0 && players[1].rank==0) || players[0].rank==1)
    {
      // "&emsp;" this tag is used for displaying four consecutive spaces
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }
    if (players[1].rank==1)
    {
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  play()
  {
    this.handleElements();
    this.handleResetButton();
    Player.getInfo();
    console.log(allPlayers);
    if (allPlayers != undefined)
    {
      image(track,0,-height*5,width,height*6);
      this.showLeaderboard();
      var index = 0;
      for (var i in allPlayers)
      {
        index = index + 1;
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;
        cars[index-1].position.x = x;
        cars[index-1].position.y = y;


        if (index == player.index)
        {
          fill("yellow");
          strokeWeight(2);
          stroke("black");
          ellipse(x,y-10,65,80);
          text(player.name,x-15,y-70);

          //changing camera position according to the car's position
          camera.position.x = cars[index-1].position.x;
          camera.position.y = cars[index-1].position.y;
        }
      }
      this.handlePlayerControl();
      drawSprites();
    }
  }
}
