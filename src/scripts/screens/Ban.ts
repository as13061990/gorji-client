import UI from '../scenes/UI';

class Ban {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#020202');
    this._scene.add.sprite(centerX, 0, 'bg').setOrigin(.5, 0);

    const bg = this._scene.add.sprite(centerX, centerY + 60, 'bg-rules').getBounds();
    this._scene.add.sprite(centerX, 73, 'logo').setOrigin(.5, 0);

    this._scene.add.text(centerX, bg.top + 80, 'БАН', {
      font: '45px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setStroke('#3592FF', 2);
    
    this._scene.add.text(bg.centerX, bg.centerY, 'Вы заблокированы\nза подтасовку результатов игры', {
      font: '50px Grato-Medium',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(.5, .5).setLineSpacing(20).getBounds();
  }
}

export default Ban;