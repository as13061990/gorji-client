import Session from '../data/Session';
import Game from '../scenes/Game';

class HP extends Phaser.GameObjects.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.height - 100, 'hp-bg');
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
    this._scene.add.sprite(this.x, this.y, 'hp-borders').setDepth(this.depth - 1);
    this._progress = this._scene.add.sprite(
      this.getBounds().left,
      this.y,
      'hp-progress'
    ).setOrigin(0, .5).setDepth(this.depth);

    this._text = this._scene.add.text(this.x, this.y, Session.getHP().toString(), {
      font: '30px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setStroke('#000000', 3).setDepth(this.depth);
  }

  public setAnimation(): void {
    this._tween?.stop();
    this._tween?.destroy();

    const max = this.displayWidth;
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
    if (this._text.text !== Session.getHP.toString()) {
      this._text.setText(Session.getHP().toString());
    }
  }
}

export default HP;