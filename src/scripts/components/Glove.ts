import Object from '../components/Object';
import Session from '../data/Session';
import Game from '../scenes/Game';

const MOVE_SPEED = 3000;
const MIN_DISTANCE = 50;

class Glove extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'glove-1');
    this._scene = scene;
    this._build();
  }

  private _scene: Game;
  private _pointerUp: boolean = true;
  private _tween: Phaser.Tweens.Tween;
  private _state: 1 | 2 | 3 = 1;

  private _build(): void {
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);
    this.setDepth(2);
    this.body.setCircle(this.displayWidth / 2);

    // this._scene.input.on('pointerdown', (): void => {
    //   this._pointerUp = false;
    // }, this);
    // this._scene.input.on('pointerup', (): void => {
    //   this._pointerUp = true;
    // }, this);

    this._сlick();
  }

  private _сlick(): void {
    let xDown: number, yDown: number, press: boolean;
    const indent = 5;
  
    this._scene.input.on('pointerdown', () => {
      xDown = this.x;
      yDown = this.y;
      press = true;
    });
    this._scene.input.on('pointerout', () => {
      if (press) {
        press = false;
      }
    });
    this._scene.input.on('pointerup', (e: Phaser.Input.Pointer) => {
      let x: number, y: number;
  
      if (xDown >= this.x) x = xDown - this.x;
      else x = this.x - xDown;
  
      if (yDown >= this.y) y = yDown - this.y;
      else y = this.y - yDown;

      if (press && x < indent && y < indent) {
        press = false;
        this._clickAnimation(e);
      } else if (press) {
        press = false;
      }
    });
  }

  private _clickAnimation(e: Phaser.Input.Pointer): void {
    if (!Session.isReady()) return;
    if (Session.isOver()) return;

    this._tween?.stop();
    this._tween?.destroy();
    this._tween = this._scene.add.tween({
      targets: this,
      x: e.position.x,
      y: e.position.y,
      duration: 100,
      onUpdate: (e) => {
        if (e.totalProgress < .3) {
          this._state = 1;
        } else if (e.totalProgress > .3 && e.totalProgress < .85) {
          this._state = 2;
        } else {
          this._state = 3;
        }
      },
      onComplete: () => {
        this._scene.physics.overlap(this, this._scene.objects, (glove: Glove, object: Object) => {
          this._scene.actions.takeObject(object);
        });
        this._scene.time.addEvent({ delay: 500, callback: (): void => {
          if (!this._tween?.isActive()) {
            this._state = 1;
          }
        }, loop: false });
      }
    });
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
    const texture = 'glove-' + this._state;
    
    if (texture !== this.texture.key) {
      this.setTexture(texture);
    }
    this._moving();
  }
}

export default Glove;