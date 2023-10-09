import Session from '../data/Session';
import Boot from '../scenes/Boot';
import Game from '../scenes/Game';

class Interval {
  constructor(scene: Boot) {
    this._scene = scene;
    this.init();
  }

  private _scene: Boot;

  private init(): void {
    setInterval(() => this._timer(), 10);
    setInterval(() => this._hp(), 1000);
  }

  private _timer(): void {
    if (!this._scene.scene.isActive('Game') || !Session.isReady() || Session.isOver()) return;
    Session.plusTime();
  }

  private _hp(): void {
    if (!this._scene.scene.isActive('Game') || !Session.isReady() || Session.isOver()) return;
    const scene = this._scene.game.scene.getScene('Game') as Game;
    const n = Math.floor(Session.getTime() / 1000);
    const hp = 2 * n + 1;
    Session.minusHP(hp);
    scene.hp.setAnimation();
    
    if (Session.getHP() === 0) {
      scene.actions.gameOver();
    }
  }
}

export default Interval;