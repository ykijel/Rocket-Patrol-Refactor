class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('gigaspaceship', './assets/gigaspaceship.png');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/explosioneffect.mp3');
        this.load.audio('sfx_explosion3', './assets/longexplosion.mp3');
        this.load.audio('sfx_explosion4', './assets/weirdexplosion.mp3');
        this.load.audio('sfx_explosion5', './assets/popexplosion.mp3');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      }

    create() {
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
      this.add.sprite(50,50,'gigaspaceship');
      this.add.sprite(game.config.width-50,50,'gigaspaceship');
      this.add.sprite(game.config.width-50,game.config.height-50,'gigaspaceship');
      this.add.sprite(50,game.config.height-50,'gigaspaceship');
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '35px',
            backgroundColor: '#FFDDFD', 
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2.75 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#EDACFA';
        this.add.text(game.config.width/2, game.config.height/2.25, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.75, 'Hit spaceships to gain points', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FF00FF';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/1.5 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gigaSpaceshipSpeed: 6,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 7,
            gigaSpaceshipSpeed: 10,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }

}