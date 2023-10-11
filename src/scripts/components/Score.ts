import Game from '../scenes/Game';

class Score extends Phaser.GameObjects.Text {
  constructor(scene: Game, x: number, y: number, score: number) {
    const text = (score > 0 ? '+' : '') + score;
    super(scene, x, y, text, {
      fontSize: '40px',
      fontFamily: 'Grato-Bold',
      color: score > 0 ? '#FF5B35' : '#8E3CCE'
    });
    this._scene = scene;
    this._build();
  }

  private _scene: Game;

  private _build(): void {
    this.setDepth(3);
    this.setOrigin(.5, .5);
    this._scene.add.existing(this);

    this._scene.add.tween({
      targets: this,
      duration: 1500,
      alpha: 0,
      y: '-=200',
      onComplete: (): void => {
        this.destroy();
      }
    });
  }
}

export default Score;