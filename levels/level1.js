var enemyPlane1, enemyPlane2, enemyPlane3, enemyPlane4, enemyPlane5
var playerPlane, pBulletGroup
var eBullet, eBulletGroup
var score = 0
class Level1 {
    preload() {
        playerImg = loadImage("images/player.png")
        pbulletImg = loadImage("images/pBullet1.jpg")
        ebulletImg = loadImage("images/eBullet1.jpg")
        enemyImg = loadImage("images/enemy1.png")

        bulletSound = loadSound("sounds/bulletSound.mp3")
        eBulletSound = loadSound("sounds/eBullet.mp3")
        pBlastSound = loadSound("sounds/pBlast.mp3")
    }
    setup() {
        playerPlane = createSprite(500, 400, 50, 50);
        playerPlane.addImage(playerImg)
        playerPlane.scale = 0.2

        enemyPlane1 = createSprite(windowWidth - 200, 150, 50, 50)
        enemyPlane1.addImage(enemyImg)
        enemyPlane1.scale = 0.17

        enemyPlane2 = createSprite(windowWidth - 400, 150, 50, 50)
        enemyPlane2.addImage(enemyImg)
        enemyPlane2.scale = 0.17

        enemyPlane3 = createSprite(windowWidth - 650, 150, 50, 50)
        enemyPlane3.addImage(enemyImg)
        enemyPlane3.scale = 0.17

        enemyPlane4 = createSprite(200, 150, 50, 50)
        enemyPlane4.addImage(enemyImg)
        enemyPlane4.scale = 0.17

        enemyPlane5 = createSprite(500, 150, 50, 50)
        enemyPlane5.addImage(enemyImg)
        enemyPlane5.scale = 0.17

        pBulletGroup = new Group();
        eBulletGroup = new Group()
        level2 = new Level2()
    }
    draw() {
        if (gameState === "start") {
            playerPlane.visible = false
            enemyPlane1.visible = false;
            enemyPlane2.visible = false;
            enemyPlane3.visible = false;
            enemyPlane4.visible = false;
            enemyPlane5.visible = false;
            bgMusic.play()
        }
        if (gameState === "play") {
            playerPlane.visible = true
            enemyPlane1.visible = true;
            enemyPlane2.visible = true;
            enemyPlane3.visible = true;
            enemyPlane4.visible = true;
            enemyPlane5.visible = true;
            this.keyNavigation(playerPlane)
            this.destroyPlayer(playerPlane)
            this.enemyBullet()
            this.destroyEnemy()
        }
        if (gameState === "pause") {
            eBulletGroup.setVelocityEach(0);
            playerPlane.visible = false
        }
        if (gameState === "end") {
            eBulletGroup.destroyEach();
            playerPlane.visible = false;
            enemyPlane1.visible = false;
            enemyPlane2.visible = false;
            enemyPlane3.visible = false;
            enemyPlane4.visible = false;
            enemyPlane5.visible = false;
        }

        // drawSprites();
    }
    playerBullet() {
        var bullet = createSprite(150, 350, 10, 10);
        bullet.addImage(pbulletImg);
        bullet.scale = 0.3;
        bulletSound.play()
        bullet.velocityY = -5;
        bullet.x = playerPlane.x;
        bullet.y = playerPlane.y;
        pBulletGroup.add(bullet)
    }
    destroyEnemy() {
        if (pBulletGroup.isTouching(enemyPlane1)) {
            enemyPlane1.destroy()
            score += 10
        }
        else if (pBulletGroup.isTouching(enemyPlane2)) {
            enemyPlane2.destroy()
            score += 10
        }
        else if (pBulletGroup.isTouching(enemyPlane3)) {
            enemyPlane3.destroy()
            score += 10
        }
        else if (pBulletGroup.isTouching(enemyPlane4)) {
            enemyPlane4.destroy()
            score += 10
        }
        else if (pBulletGroup.isTouching(enemyPlane5)) {
            enemyPlane5.destroy()
            score += 10
        }

    }
    enemyBullet() {
        if (World.frameCount % 10 === 0) {
            eBullet = createSprite(windowWidth, 150, 10, 10);
            eBullet.addImage(ebulletImg);
            eBullet.scale = 0.5;
            eBulletSound.play()
            eBullet.velocityY = 5;
            eBullet.depth = playerPlane.depth
            playerPlane.depth += 1
            var rand = Math.round(random(1, 5))
            switch (rand) {
                case 1: eBullet.x = enemyPlane1.x;
                    break;
                case 2: eBullet.x = enemyPlane2.x;
                    break;
                case 3: eBullet.x = enemyPlane3.x;
                    break;
                case 4: eBullet.x = enemyPlane4.x;
                    break;
                case 5: eBullet.x = enemyPlane5.x;
                    break;
                default: break;
            }

            // else if (enemyPlane4.destroy) {
            //     var rand = Math.round(random(2, 5))
            //     switch (rand) {
            //         case 2: eBullet.x = enemyPlane2.x;
            //             break;
            //         case 3: eBullet.x = enemyPlane3.x;
            //             break;
            //         case 4: eBullet.x = enemyPlane1.x;
            //             break;
            //         case 5: eBullet.x = enemyPlane5.x;
            //             break;
            //         default: break;
            //     }
            // }
            eBulletGroup.add(eBullet)

        }
    }
    destroyPlayer(playerPlane) {
        if (eBulletGroup.isTouching(playerPlane)) {
            playerPlane.destroy();
            pBlastSound.play()
            pBulletGroup.destroyEach()
            gameState = "end"
        }
    }
    keyNavigation(playerPlane) {
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
    keyPressed() {
        if (keyCode === 32 && gameState === "play") {
            this.playerBullet();
        }
    }
}

