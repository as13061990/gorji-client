import Glove from '../components/Glove';
import Ready from '../components/Ready';
import Timer from '../components/Timer';
import Object from '../components/Object';
import Session from '../data/Session';
import Settings from '../data/Settings';
import Game from '../scenes/Game';
import { objectType, objectPosition, screen } from '../types/enums';
import HP from '../components/HP';

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;
  private _glove: Glove;

  public init(): void {
    this._glove = new Glove(this._scene);
    const ready = new Ready(this._scene);
    new Timer(this._scene);
    this._scene.hp = new HP(this._scene);
    ready.callback = this._start.bind(this);
    this._setCollisions();
  }

  private _start(): void {
    Session.setReady(true);
    this._createObject();
  }

  private _setCollisions(): void {
    this._scene.physics.add.overlap(
      this._glove,
      this._scene.objects,
      this._taking.bind(this)
    );
  }

  private _taking(glove: Glove, object: Object): void {
    if (Session.isOver()) return;
    if (glove.getCollision() === false) return;
    
    const type = object.getType();
    const objects = [
      objectType.OBJECT_1,
      objectType.OBJECT_2
    ];

    if (objects.find(data => data === type)) {
      Session.plusHP(type === objectType.OBJECT_2 ? 20 : 10);
    } else {
      Session.minusHP(10);
    }
    this._scene.hp.setAnimation();
    object.destroy();
  }

  private _createObject(): void {
    const types: objectType[] = [];
    types.push(objectType.OBJECT_1);
    types.push(objectType.OBJECT_1);
    types.push(objectType.OBJECT_1);
    types.push(objectType.OBJECT_2);
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

    const co = (Session.getCo() - 1) * 100;
    const delay = Math.floor(1000 - co);
    this._scene.time.addEvent({ delay: delay > 300 ? delay : 300, callback: (): void => {
      if (Session.isOver() === false) {
        const obj = new Object(this._scene, type, position);
        this._scene.tweens.add({
          targets: obj,
          rotation: Phaser.Math.RND.pick(Phaser.Math.RND.signs) * 2 * Math.PI,
          duration: Phaser.Math.Between(7000, 10000),
          repeat: -1
        });
        this._createObject();
      }
    }, loop: false });
  }

  public gameOver(): void {
    Session.setOver(true);
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const tile = this._scene.add.tileSprite(centerX, centerY, width, height, 'black-pixel').setDepth(5).setAlpha(.6);

    this._scene.add.text(centerX, centerY, 'КОНЕЦ!', {
      font: '170px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setDepth(tile.depth);

    this._scene.time.addEvent({ delay: 3000, callback: (): void => {
      Settings.setScreen(screen.RESULT);
      this._scene.scene.start('UI');
    }, loop: false });
  }
}

export default GameActions;