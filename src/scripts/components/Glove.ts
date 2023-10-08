import Session from '../data/Session';
import Game from '../scenes/Game';

const MOVE_SPEED = 3000;
const MIN_DISTANCE = 50;

class Glove extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'glove');
    this._scene = scene;
    this._build();
  }

  private _scene: Game;
  private _pointerUp: boolean = true;

  private _build(): void {
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);
    this.setDepth(2);
    this.body.setCircle(this.displayWidth / 2);

    this._scene.input.on('pointerdown', (): void => {
      this._pointerUp = false;
    }, this);
    this._scene.input.on('pointerup', (): void => {
      this._pointerUp = true;
    }, this);
  }

  private _moving(): void {
    const pointer = this._scene.input.activePointer;

    if (pointer.getDuration() > 0 && !this._pointerUp) {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        pointer.x,
        pointer.y
      );

      if (distance < MIN_DISTANCE) {
        this.body.reset(pointer.x, pointer.y);
      } else {
        const target = new Phaser.Math.Vector2(
          pointer.x,
          pointer.y
        );
        this._scene.physics.moveToObject(this, target, MOVE_SPEED);
      }
    } else {
      this.body.reset(this.x, this.y);
    }
  }

  public getCollision(): boolean {
    return this._pointerUp === false;
  }

  public preUpdate(): void {
    if (!Session.isReady()) return;
    if (Session.isOver()) return;
    this._moving();
  }
}

export default Glove;