class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('gigaspaceship', './assets/gigaspaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.atlas('flares', './assets/flares.png', './assets/flares.json');
      }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.gigaSpaceship = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'gigaspaceship', 0, 50, game.settings.gigaSpaceshipSpeed).setOrigin(0,0);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        if(!this.highScore)
        {
          this.highScore = 0;
        }
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70
        }
        let scoreTextConfig = {
          fontFamily: 'Courier',
          fontSize: '20px',
          color: '#000000',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 200
      }
        this.scoreLeft = this.add.text(borderUISize + borderPadding*6, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize*4 - borderPadding, borderUISize + borderPadding*2, this.highScore, scoreConfig);
        this.scoreTextRight = this.add.text(game.config.width - borderUISize*10 - borderPadding*2, borderUISize + borderPadding*2, "High Score", scoreTextConfig);
        this.scoreTextLeft = this.add.text(borderPadding-115, borderUISize + borderPadding*2, "Score", scoreTextConfig);
        this.fireText = this.add.text((game.config.width - borderUISize*10 - borderPadding*5), borderUISize + borderPadding*2, "FIRE", scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        
  }

  update() {

    this.fireText.visible = false;
      // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }
    this.starfield.tilePositionX -= 4;
    if (!this.gameOver) {               
        this.p1Rocket.update();         // update rocket sprite
        this.ship01.update();           // update spaceships (x3)
        this.ship02.update();
        this.gigaSpaceship.update();
    } 
    // check collisions
    if(this.checkCollision(this.p1Rocket, this.gigaSpaceship)) 
    {
        this.p1Rocket.reset();
        this.shipExplode(this.gigaSpaceship);
        this.shootParticles(this.gigaSpaceship);  
    }
    if(this.checkCollision(this.p1Rocket, this.ship02)) 
    {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
        this.shootParticles(this.ship02); 
    }
    if(this.checkCollision(this.p1Rocket, this.ship01)) 
    {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
        this.shootParticles(this.ship01); 
    }
    if(this.p1Rocket.penalty)
    {
        if(this.p1Score > 0)
        {
          this.p1Score -= 5;
        }
        this.p1Rocket.penalty = false;
        this.scoreLeft.text = this.p1Score;
    }
    if(this.p1Rocket.isFiring)
    {
      this.fireText.visible = true;
    }
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
      rocket.x + rocket.width > ship.x && 
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship. y) {
      return true;
    } else {
      return false;
    }
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;                         
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after ani completes
      ship.reset();                       // reset ship position
      ship.alpha = 1;                     // make ship visible again
      boom.destroy();                     // remove explosion sprite
    });
    // score add and repaint
    this.p1Score += ship.points;
    if(this.p1Score > this.highScore)
    {
      this.highScore = this.p1Score;
    }
    this.scoreLeft.text = this.p1Score;
    this.scoreRight.text = this.highScore;
    let rand = Math.floor(Math.random() * 5);

    if(rand == 0)
    {
      this.sound.play('sfx_explosion'); 
    }
    else if(rand == 1)
    {
      this.sound.play('sfx_explosion2');
    }
    else if(rand == 2)
    {
      this.sound.play('sfx_explosion3');
    }
    else if(rand == 3)
    {
      this.sound.play('sfx_explosion4');
    }
    else
    {
      this.sound.play('sfx_explosion5');
    }
    
  }

  shootParticles(ship)
  {
    const emitter = this.add.particles(ship.x, ship.y, 'flares', {
      frame: [ 'red' ],
      lifespan: 250,
      speed: { min: 400, max: 400 },
      scale: { start: 0.5, end: 0 },
      gravityY: 300,
      blendMode: 'ADD',
      emitting: false
  });
    emitter.explode(20); 
  }

}
