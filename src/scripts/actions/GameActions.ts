import Glove from '../components/Glove';
import Ready from '../components/Ready';
import Timer from '../components/Timer';
import Session from '../data/Session';
import Game from '../scenes/Game';

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
    ready.callback = this._start.bind(this);
    this._setCollisions();
  }

  private _start(): void {
    Session.setReady(true);


  }

  private _setCollisions(): void {
    this._scene.physics.add.overlap(
      this._glove,
      this._scene.objects,
      this._cutting.bind(this)
    );
  }

  private _cutting(glove: Glove, object: Phaser.Physics.Arcade.Sprite): void {
    // if (this._scene.isOver()) return;
    // if (glove.getCollision() === false) return;
    // if (glove.getDistance() < Settings.distance) return;
    
    // const type = object.getType();
    const cabbages = [
      // cabbageType.CABBAGE_SIMPLE,
      // cabbageType.CABBAGE_SILVER,
      // cabbageType.CABBAGE_GOLD
    ];

    // if (cabbages.find(data => data === type)) {
    //   // const points = type === cabbageType.CABBAGE_GOLD ? 50 : type === cabbageType.CABBAGE_SILVER ? 20 : 10;
    //   // Session.plusScore(points);

    //   // this._crush(type, object);
    //   // this._blob(type, object);
    // } else {
    //   // this.minusLife();
    // }
    object.destroy();
  }
}

export default GameActions;