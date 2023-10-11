import Button from '../components/Button';
import Text from '../components/Text';
import Settings from '../data/Settings';
import Utils from '../data/Utils';
import UI from '../scenes/UI';
import { objectPosition, objectType, screen } from '../types/enums';

class Main {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY, height } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#020202');
    this._scene.add.sprite(centerX, 0, 'bg').setOrigin(.5, 0).setDepth(-2);
    this._scene.add.sprite(centerX, 73, 'logo').setOrigin(.5, 0);
    
    this._scene.add.sprite(centerX, centerY - 60, 'logo-bottle').setScale(.8).setDepth(-1);
    const line1 = this._scene.add.text(centerX, Utils.getStretchPoint(height, 6, 2) - 100, 'ПРОДЕРЖИСЬ В ИГРЕ ДОЛЬШЕ ВСЕХ', {
      font: '32px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).getBounds();
    const line2 = this._scene.add.text(centerX - 230, line1.bottom + 10, 'И ЗАЛУТАЙ МЕРЧ С', {
      font: '32px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(0, 0).getBounds();
    this._scene.add.text(line2.right + 10, line2.y, 'TI 2023', {
      font: '32px Grato-Bold',
      color: '#FF5B35'
    }).setOrigin(0, 0).getBounds();
    
    const play = new Button(this._scene, centerX, height - 317, 'button-orange');
    play.text = this._scene.add.text(play.x, play.y, 'ПОГНАЛИ', {
      font: '35px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    play.callback = this._play.bind(this);

    const ratings = new Button(this._scene, centerX + 260, height - 140, 'button-grey');
    ratings.text = this._scene.add.text(ratings.x, ratings.y, 'РЕЙТИНГ', {
      font: '35px Grato-Bold',
      color: '#DAF7FD'
    }).setOrigin(.5, .5).setShadow(5, 5, '#000000');
    ratings.callback = this._ratings.bind(this);

    const rules = new Button(this._scene, centerX - 260, height - 140, 'button-grey');
    rules.text = this._scene.add.text(rules.x, rules.y, 'ПРАВИЛА', {
      font: '35px Grato-Bold',
      color: '#DAF7FD'
    }).setOrigin(.5, .5).setShadow(5, 5, '#000000');
    rules.callback = this._rules.bind(this);
    this._createObject();
  }

  private _play(): void {
    this._scene.scene.start('Game');
  }

  private _ratings(): void {
    Settings.setScreen(screen.RATINGS);
    this._scene.scene.restart();
  }

  private _rules(): void {
    Settings.setScreen(screen.RULES);
    this._scene.scene.restart();
  }

  private _createObject(): void {
    const types: objectType[] = [];
    types.push(objectType.OBJECT_1);
    types.push(objectType.OBJECT_2);
    types.push(objectType.OBJECT_3);
    types.push(objectType.OBJECT_4);

    const positions: objectPosition[] = [];
    positions.push(objectPosition.TOP_LEFT);
    positions.push(objectPosition.TOP_RIGHT);
    positions.push(objectPosition.LEFT);
    positions.push(objectPosition.RIGHT);
    positions.push(objectPosition.BOTTOM_LEFT);
    positions.push(objectPosition.BOTTOM_RIGHT);

    const position = positions[Phaser.Math.Between(0, positions.length - 1)];
    const type: objectType = types[Phaser.Math.Between(0, types.length - 1)];

    this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      const obj = new Unit(this._scene, type, position);
      this._scene.tweens.add({
        targets: obj,
        rotation: Phaser.Math.RND.pick(Phaser.Math.RND.signs) * 2 * Math.PI,
        duration: Phaser.Math.Between(7000, 10000),
        repeat: -1
      });
      this._createObject();
    }, loop: false });
  }
}

class Unit extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: UI, type: objectType, position: objectPosition) {
    super(scene, 0, 0, type);
    this._scene = scene;
    this._type = type;
    this._position = position;
    this._build();
  }

  private _scene: UI;
  private _type: objectType;
  private _position: objectPosition;

  private _build(): void {
    this._setPosition();
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);
    this.setDepth(-1);
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
    const co = 1.2;
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
    const bounds = this.getBounds();
    const { width, height } = this._scene.cameras.main;

    if (bounds.top > height + 100 || bounds.left > width || bounds.right < 0) {
      this.destroy();
    }
  }

  public getType(): objectType {
    return this._type;
  }
}

export default Main;