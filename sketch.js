var eBullet;
var playerPlane1, playerPlane2, playerPlane3, playerImg;
var enemyPlane, enemyImg;
var background, backImg;
var bulletImg;
var enemyGroup;
var eBulletGroup, pBulletGroup;
var chances = 2;
var p1 = true, p2 = false, p3 = false, p4 = false
var gameState = "start";
var blast;
var pbulletImg, eBulletImg;
var score = 0;
var blastSound, pBlastSound, bulletSound, eBulletSound;

function preload() {
  backImg = loadImage("images/back.png")
  playerImg = loadImage("images/player.png")
  pbulletImg = loadImage("images/pBullet1.jpg")
  ebulletImg = loadImage("images/eBullet1.jpg")
  enemyImg = loadImage("images/enemy1.png")
  blast = loadImage("images/blast1.png")

  blastSound = loadSound("sounds/blastSound.mp3")
  pBlastSound = loadSound("sounds/pBlast.mp3")
  bulletSound = loadSound("sounds/bulletSound.mp3")
  eBulletSound = loadSound("sounds/eBullet.mp3")
  gameOverImg = loadImage("images/gameo.jpg")
  bgMusic = loadSound("sounds/bgMusic.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background = createSprite(windowWidth / 2, windowWidth / 2);
  background.addImage(backImg)

  playerPlane1 = createSprite(500, 400, 50, 50);
  playerPlane1.addImage(playerImg)
  playerPlane1.scale = 0.2

  enemyGroup = new Group();
  eBulletGroup = new Group();
  pBulletGroup = new Group();
  e = createSprite(110, 100, 50, 50)
  e.addImage(enemyImg)
  e.scale = 0.19
  e2 = createSprite(1310, 100, 50, 50)
  e2.addImage(enemyImg)
  e2.scale = 0.19
  e3 = createSprite(110, 350, 50, 50)
  e3.addImage(enemyImg)
  e3.scale = 0.19
  e4 = createSprite(1310, 350, 50, 50)
  e4.addImage(enemyImg)
  e4.scale = 0.19
  p = createSprite(680, 600, 50, 50);
  p.addImage(playerImg)
  p.scale = 0.25

  userInterface = new UserInterface()
  userInterface.display()
  pause = new Pause()
}
function draw() {
  if (gameState === "start") {
    playerPlane1.visible = false
    bgMusic.play()
  }
  if (background.y > 400) {
    background.y = 300;
  }
  drawSprites();
  if (gameState === "play") {
    pause.display()
    bgMusic.stop()
    e.visible = false
    e2.visible = false
    e3.visible = false
    e4.visible = false
    p.visible = false
    playerPlane1.visible = true
    background.velocityY = 1
    spawnEnemyPlane();
    if (p1) {
      destroyPlayer(playerPlane1);
    }
    else if (p2) {
      destroyPlayer(playerPlane2);
    }
    else if (p3) {
      destroyPlayer(playerPlane3)
    }
    else if (p4) {
      destroyPlayer(playerPlane4)
      gameState = "end"
    }
    destroy(pBulletGroup, enemyGroup)

    if (p1) {
      keyNavigation(playerPlane1);
    }
    else if (p2) {
      keyNavigation(playerPlane2)
    }
    else if (p3) {
      keyNavigation(playerPlane3)
    }
    fill("white")
    textSize(20)
    textFont("Courier New");
    text("Chances left: " + chances, 700, 50)
    fill("white")
    textSize(20)
    textFont("Courier New");
    text("Score: " + score, 100, 50)
  }
  if (gameState === "pause") {
    enemyGroup.setVelocityEach(0)
    eBulletGroup.setVelocityEach(0);
    background.velocityY = 0
    if (p1) {
      playerPlane1.visible = false
    }
    else if (p2) {
      playerPlane2.visible = false
    }
    else if (p3) {
      playerPlane3.visible = false
    }
  }
  if (gameState === "end") {
    gameOver();
  }

}
function spawnEnemyPlane() {
  if (World.frameCount % 40 === 0) {
    var rand = Math.round(random(100, 300));
    var r = Math.round(random(1, 2, 3, 4))
    switch (r) {
      case 1: enemyPlane = createSprite(1000, rand, 50, 50);
        enemyPlane.velocityX = -5;
        break;
      case 2: enemyPlane = createSprite(0, rand, 50, 50);
        enemyPlane.velocityX = 5;
        break;
      case 3: enemyPlane = createSprite(500, rand, 50, 50);
        enemyPlane.velocityX = 5;
        break;
      case 4: enemyPlane = createSprite(500, rand, 50, 50);
        enemyPlane.velocityX = -5;
        break;
      default: break;
    }

    enemyPlane.addImage(enemyImg)
    enemyPlane.scale = 0.1;


    enemyGroup.add(enemyPlane)
    if (enemyPlane.y < 550 || enemyPlane.x < 900) {
      enemyBullet(rand);
    }

  }

}
function destroy(group1, group2) {
  for (var i = 0; i < group2.length; i++) {
    if (group2.get(i).isTouching(group1)) {
      group2.get(i).addImage(blast)
      group2.get(i).visible = false
      group1.destroyEach()
      score += 10
      blastSound.play()
    }
  }
}
function enemyBullet(rand) {

  if (World.frameCount % 20 === 0) {

    eBullet = createSprite(1000, rand, 10, 10);
    eBullet.addImage(ebulletImg);
    eBullet.scale = 0.5;
    eBulletSound.play()

    eBullet.velocityY = 5;
    eBullet.depth = playerPlane1.depth
    playerPlane1.depth += 1
    eBullet.x = enemyPlane.x;

    eBulletGroup.add(eBullet)

    eBullet.velocityX = enemyPlane.velocityX;

  }

}
function playerBullet() {
  var bullet = createSprite(150, 350, 10, 10);
  bullet.addImage(pbulletImg);
  bullet.scale = 0.3;
  bulletSound.play()
  bullet.velocityY = -5;
  if (p1) {
    bullet.x = playerPlane1.x;
    bullet.y = playerPlane1.y;
  }
  else if (p2) {
    bullet.x = playerPlane2.x;
    bullet.y = playerPlane2.y;
  }
  else if (p3) {
    bullet.x = playerPlane3.x;
    bullet.y = playerPlane3.y;
  }
  pBulletGroup.add(bullet)
}
function keyNavigation(playerPlane) {
  if (keyDown("up")) {
    playerPlane.y = playerPlane.y - 10;
  }
  if (keyDown("down")) {
    playerPlane.y = playerPlane.y + 10;
  }
  if (keyDown("left")) {
    playerPlane.x = playerPlane.x - 10;
  }
  if (keyDown("right")) {
    playerPlane.x = playerPlane.x + 10;
  }
}
function destroyPlayer(playerPlane) {
  if (eBulletGroup.isTouching(playerPlane)) {
    playerPlane.destroy();
    pBlastSound.play()
    pBulletGroup.destroyEach()
    if (playerPlane === playerPlane1) {
      p1 = false
      p2 = true
      chances -= 1
      playerPlane2 = createSprite(500, 400, 50, 50);
      playerPlane2.addImage(playerImg)
      playerPlane2.scale = 0.2;

    }
    if (playerPlane === playerPlane2) {
      p2 = false
      p3 = true
      chances -= 1
      playerPlane3 = createSprite(500, 400, 50, 50);
      playerPlane3.addImage(playerImg)
      playerPlane3.scale = 0.2;

    }
    if (playerPlane === playerPlane3) {
      p3 = false
      p4 = true
      playerPlane4 = createSprite(500, 400, 50, 50);
      playerPlane4.addImage(playerImg)
      playerPlane4.scale = 0.2;

    }
  }
}
function gameOver() {
  enemyGroup.setVelocityEach(0)
  eBulletGroup.destroyEach();
  background.velocityY = 0
  background.x = windowWidth / 2
  background.y = windowHeight / 2
  background.addImage(gameOverImg)
  background.scale = 2.4
  textSize(50)
  fill("green")
  text(score, 800, 655)
  playerPlane4.visible = false
  e2.visible = false
  e3.visible = false
  e4.visible = false
  p.visible = false
  pause.hide()
}
function keyPressed() {
  if (keyCode === 32 && gameState === "play") {
    playerBullet();
  }
}