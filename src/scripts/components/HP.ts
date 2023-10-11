import Session from '../data/Session';
import Game from '../scenes/Game';

class HP extends Phaser.GameObjects.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.height - 144, 'bg-hp');
    this._scene = scene;
    this._build();
  }
  
  private _scene: Game;
  private _progress: Phaser.GameObjects.Sprite;
  private _text: Phaser.GameObjects.Text;
  private _tween: Phaser.Tweens.Tween;

  private _build(): void {
    this._scene.add.existing(this);
    this.setDepth(4);
    this._progress = this._scene.add.sprite(
      this.getBounds().left + 10,
      this.y,
      'hp-progress'
    ).setOrigin(0, .5).setDepth(this.depth);

    this._text = this._scene.add.text(this.x, this.y, `${Session.getHP().toString()}/100`, {
      font: '30px Grato-Black',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setDepth(this.depth);
  }

  public setAnimation(): void {
    this._tween?.stop();
    this._tween?.destroy();

    const max = this.displayWidth - 20;
    const percent = Session.getHP() > 100 ? 100 : Session.getHP();
    const width = Math.round(max / 100 * percent);
    
    if (this._progress.displayWidth !== width) {
      this._tween = this._scene.add.tween({
        targets: this._progress,
        duration: 200,
        displayWidth: width
      });
    }
  }

  protected preUpdate(): void {
    const text = `${Session.getHP().toString()}/100`;

    if (this._text.text !== text) {
      this._text.setText(text);
    }
  }
}

export default HP;