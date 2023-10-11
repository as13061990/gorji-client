import Game from '../scenes/Game';

class Ready {
  constructor(scene: Game) {
    this._scene = scene;
    this._build();
  }

  private _scene: Game;
  public callback: Function;

  private _build(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const tile = this._scene.add.tileSprite(centerX, centerY, width, height, 'black-pixel').setDepth(5).setAlpha(.8);

    const timer = this._scene.add.text(centerX, centerY, '3', {
      font: '150px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setDepth(tile.depth);

    this._scene.add.tween({
      targets: timer,
      scale: 1.3,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    const time = this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      const num = Number(timer.text) - 1;
      timer.setText(num.toString());

      if (num === 0) {
        timer.destroy();
        tile.destroy();
        time.remove();
        typeof this.callback === 'function' && this.callback();
      }
    }, loop: true });
  }
}

export default Ready;