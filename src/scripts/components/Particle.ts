import Game from '../scenes/Game';

class Particle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(
      scene,
      Phaser.Math.Between(50, 1200),
      Phaser.Math.Between(-100, -300),
      'particle-' + Phaser.Math.Between(1, 6)
    );
    this._scene = scene;
    this._build();
  }

  private _scene: Game;

  private _build(): void {
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);
    const x = Phaser.Math.Between(-250, 50);
    const y = Phaser.Math.Between(150, 300);
    this.setVelocity(x, y);
    this._scene.tweens.add({
      targets: this,
      rotation: Phaser.Math.RND.pick(Phaser.Math.RND.signs) * 2 * Math.PI,
      duration: Phaser.Math.Between(7000, 10000),
      repeat: -1
    });
  }

  protected preUpdate(): void {
    if (this.x < 0 || this.y > this._scene.cameras.main.height) {
      this.destroy();
    }
  }
}

export default Particle;