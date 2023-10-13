import Session from '../data/Session';
import Settings from '../data/Settings';
import Game from '../scenes/Game';
import { objectPosition, objectType } from '../types/enums';

class Unit extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, type: objectType, position: objectPosition) {
    super(scene, 0, 0, type);
    this._scene = scene;
    this._type = type;
    this._position = position;
    this._build();
  }

  private _scene: Game;
  private _type: objectType;
  private _position: objectPosition;

  private _build(): void {
    this._setPosition();
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);
    this.setDepth(2);
    this.setInteractive({ cursor: 'pointer '});
    const bad = this._type === objectType.OBJECT_3 || this._type === objectType.OBJECT_4;
    const radius = bad ? this.displayWidth / 4 : this.displayWidth / 2;
    const offsetX = bad ? this.displayWidth / 4 : 0;
    const offsetY =  bad ? this.displayHeight / 4 : 0;
    
    this.body.setCircle(radius, offsetX, offsetY);
    this._scene.objects.add(this);
    this._move();
  }

  private _move(): void {
    const params = this._getParams();

    if (this._position === objectPosition.TOP_LEFT) {
      this.setGravity(params.sideMove, params.gravity);
    } else if (this._position === objectPosition.TOP_RIGHT) {
      this.setGravity(-params.sideMove, params.gravity);
    } else if (this._position === objectPosition.LEFT) {
      this.setGravity(params.strongSideMove, params.gravity);
      this.setVelocity(params.kick, -params.kick);
    } else if (this._position === objectPosition.RIGHT) {
      this.setGravity(-params.strongSideMove, params.gravity);
      this.setVelocity(-params.kick, -params.kick);
    } else if (this._position === objectPosition.BOTTOM_LEFT) {
      this.setVelocity(params.launchSide, -params.launch);
      this.setGravityY(params.gravity);
    } else if (this._position === objectPosition.BOTTOM_RIGHT) {
      this.setVelocity(-params.launchSide, -params.launch);
      this.setGravityY(params.gravity);
    }
  }

  private _setPosition(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;

    if (this._position === objectPosition.TOP_LEFT) {
      this.setPosition(Phaser.Math.Between(this.width / 2, centerX), -this.height / 2);
    } else if (this._position === objectPosition.TOP_RIGHT) {
      this.setPosition(Phaser.Math.Between(centerX, width - this.width / 2), -this.height / 2);
    } else if (this._position === objectPosition.LEFT) {
      this.setPosition(-this.width / 2, Phaser.Math.Between(this.height / 2, centerY - this.height / 2));
    } else if (this._position === objectPosition.RIGHT) {
      this.setPosition(width + this.width / 2, Phaser.Math.Between(this.height / 2, centerY - this.height / 2));
    } else if (this._position === objectPosition.BOTTOM_LEFT) {
      this.setPosition(Phaser.Math.Between(this.width / 2, centerX - this.width / 2), height + this.height / 2);
    } else if (this._position === objectPosition.BOTTOM_RIGHT) {
      this.setPosition(Phaser.Math.Between(centerX + this.width / 2, width - this.width / 2), height + this.height / 2);
    }
  }

  private _getParams(): IObjectParams {
    const co = .2 + Session.getCo();
    const data = {
      sideMove: Phaser.Math.Between(10, 30),
      gravity: Phaser.Math.Between(140, 240),
      strongSideMove: Settings.isMobile() ? Phaser.Math.Between(30, 50) : Phaser.Math.Between(70, 100),
      kick: Settings.isMobile() ? Phaser.Math.Between(150, 200) : Phaser.Math.Between(150, 200),
      launch: Settings.isMobile() ? Phaser.Math.Between(900, 1100) : Phaser.Math.Between(500, 700),
      launchSide: Settings.isMobile() ? Phaser.Math.Between(20, 30) : Phaser.Math.Between(80, 110)
    }
    for (const key in data) data[key] *= co;
    return data;
  }

  protected preUpdate(): void {
    if (Session.isOver()) return;

    const bounds = this.getBounds();
    const { width, height } = this._scene.cameras.main;

    if (bounds.top > height + 100 || bounds.left > width || bounds.right < 0) {
      this.destroy();

      if (this._type === objectType.OBJECT_1 || this._type === objectType.OBJECT_2) {
        Session.minusHP(10);
        this._scene.hp.setAnimation();
      }
    }
  }

  public getType(): objectType {
    return this._type;
  }
}

export default Unit;