import Session from '../data/Session';
import Boot from '../scenes/Boot';

class Interval {
  constructor(scene: Boot) {
    this._scene = scene;
    this.init();
  }

  private _scene: Boot;

  private init(): void {
    setInterval(() => {
      this._game();
    }, 10);
  }

  private _game(): void {
    if (!this._scene.scene.isActive('Game') || !Session.isReady()) return;
    Session.plusTime();
  }
}

export default Interval;