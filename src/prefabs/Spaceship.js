class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue, spaceshipSpeed)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = spaceshipSpeed;
    }

    update()
    {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width)
        {
            this.reset();
        }

    }

    reset()
    {
        this.x = game.config.width;
    }
}



