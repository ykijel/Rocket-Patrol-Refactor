/*
Yahli Kijel
Rocket Patrol Reforged: Remastered Version
10 Hours
Mods created:
  * Allow the player to control the Rocket after it's fired (1 point)
  * Track a high score that persists across scenes and display it in the UI (1 point)
  * Create 4 new explosion sound effects and randomize which one plays on impact (3 points)
  * Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5 points)
  * Implement the 'FIRE' UI text from the original game (1 point)
  * Create a new title screen (e.g., new artwork, typography, layout) (3 points)
  * Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5 points)
  * Remove points when you miss (1 point) (Got permission from a TA during section)
Citations:
  * https://www.youtube.com/watch?v=LEDPCfot_GY
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;
