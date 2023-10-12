import Glove from '../components/Glove';
import Ready from '../components/Ready';
import Timer from '../components/Timer';
import Object from '../components/Object';
import Session from '../data/Session';
import Game from '../scenes/Game';
import { objectType, objectPosition } from '../types/enums';
import HP from '../components/HP';
import Result from '../screens/Result';
import Score from '../components/Score';
import Particle from '../components/Particle';

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
    this._clouds();
    this._createParticle();
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

  private _clouds(): void {
    this._createTopCloud();
    this._scene.time.addEvent({ delay: Phaser.Math.Between(700, 1300), callback: (): void => {
      this._createBottomCloud();
    }, loop: false });
  }

  private _createTopCloud(): void {
    const { width, height } = this._scene.cameras.main;
    const cloud = this._scene.add.sprite(width, Phaser.Math.Between(0, height / 2 - 660), 'cloud').setOrigin(0, .5);
    this._scene.add.tween({
      targets: cloud,
      x: -cloud.width,
      duration: Phaser.Math.Between(15000, 20000),
      onComplete: () => {
        cloud.destroy();
        this._createTopCloud();
      }
    });
  }

  private _createBottomCloud(): void {
    const { width, height } = this._scene.cameras.main;
    const cloud = this._scene.add.sprite(width, Phaser.Math.Between(height / 2 + 660, height), 'cloud').setOrigin(0, .5);
    this._scene.add.tween({
      targets: cloud,
      x: -cloud.width,
      duration: Phaser.Math.Between(15000, 20000),
      onComplete: () => {
        cloud.destroy();
        this._createBottomCloud();
      }
    });
  }

  private _createParticle(): void {
    new Particle(this._scene);
    this._scene.time.addEvent({ delay: Phaser.Math.Between(400, 600), callback: (): void => {
      this._createParticle();
    }, loop: false });
  }

  private _taking(glove: Glove, object: Object): void {
    if (Session.isOver()) return;
    if (glove.getCollision() === false) return;
    this.takeObject(object);
  }

  public takeObject(object: Object): void {
    const type = object.getType();
    const objects = [
      objectType.OBJECT_1,
      objectType.OBJECT_2
    ];

    if (objects.find(data => data === type)) {
      const score = type === objectType.OBJECT_2 ? 20 : 10;
      new Score(this._scene, object.x, object.y - 60, score)
      Session.plusHP(score);
    } else {
      new Score(this._scene, object.x, object.y - 60, -10);
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
    const delay = Math.floor(700- co);
    this._scene.time.addEvent({ delay: delay > 200 ? delay : 200, callback: (): void => {
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
    const tile = this._scene.add.tileSprite(centerX, centerY, width, height, 'black-pixel').setDepth(5).setAlpha(.8);

    this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      tile.destroy();
      new Result(this._scene);
    }, loop: false });
  }
}

export default GameActions;