import Session from '../data/Session';
import Utils from '../data/Utils';
import Game from '../scenes/Game';

class Timer extends Phaser.GameObjects.Text {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX, 50, '', {
      font: '40px Triomphe',
      color: '#3B175C',
    });
    this._scene = scene;
    this._build();
  }

  private _scene: Game;

  private _build(): void {
    this._scene.add.existing(this);
    this.setOrigin(.5, .5);
    this.setDepth(4);
  }

  private _getTimestring(): string {
    return Utils.convertTime(Session.getTime());
  }

  protected preUpdate(): void {
    if (this.text !== this._getTimestring()) {
      this.setText(this._getTimestring());
    }
  }
}

export default Timer;