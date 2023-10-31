import Button from '../components/Button';
import Settings from '../data/Settings';
import UI from '../scenes/UI';
import { screen } from '../types/enums';

class Rules {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY, height } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#020202');
    this._scene.add.sprite(centerX, 0, 'bg').setOrigin(.5, 0);

    const bg = this._scene.add.sprite(centerX, centerY - 60, 'bg-rules').getBounds();
    this._scene.add.sprite(centerX, 73, 'logo').setOrigin(.5, 0);

    this._scene.add.text(centerX, bg.top + 80, 'КАК ИГРАТЬ?', {
      font: '45px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setStroke('#3592FF', 2);
    
    const first = this._scene.add.text(bg.left + 40, bg.top + 220, '1. Двигай            , кликай по боттлам Gorji             и рунам \n   кремния             и пополняй ХП.', {
      font: '32px Grato-Medium',
      color: '#FFFFFF'
    }).setOrigin(0, 0).setLineSpacing(40).getBounds();
    this._scene.add.sprite(first.centerX + 255, first.centerY - 42, 'rules-icon-1');
    this._scene.add.sprite(first.centerX - 228, first.centerY + 43, 'rules-icon-2');
    this._scene.add.sprite(first.centerX - 242, first.centerY - 42, 'rules-icon-5');
    
    const second = this._scene.add.text(first.x, first.y + 180, '2. Избегай                        если хочешь продержаться дольше.', {
      font: '32px Grato-Medium',
      color: '#FFFFFF'
    }).setOrigin(0, 0).getBounds();
    this._scene.add.sprite(first.left + 230, second.centerY, 'rules-icon-3');
    this._scene.add.sprite(first.left + 330, second.centerY, 'rules-icon-4');
    
    this._scene.add.text(second.x, second.y + 100, '3. Улучшай свой показатель времени столько раз, сколько\n    захочешь и фиксируй рекорд в рейтинге.', {
      font: '32px Grato-Medium',
      color: '#FFFFFF'
    }).setOrigin(0, 0).setLineSpacing(20).getBounds();
    
    if (Settings.getTime() > 0) {
      const ratings = new Button(this._scene, centerX + 260, height - 140, 'button-grey');
      ratings.text = this._scene.add.text(ratings.x, ratings.y, 'РЕЙТИНГ', {
        font: '35px Grato-Bold',
        color: '#DAF7FD'
      }).setOrigin(.5, .5).setShadow(5, 5, '#000000');
      ratings.callback = this._ratings.bind(this);
  
      const go = new Button(this._scene, centerX - 260, height - 140, 'button-orange');
      go.text = this._scene.add.text(go.x, go.y, 'ПОГНАЛИ', {
        font: '35px Grato-Bold',
        color: '#FFFFFF'
      }).setOrigin(.5, .5);
      go.callback = this._play.bind(this);
    } else {
      const go = new Button(this._scene, centerX, height - 140, 'button-orange');
      go.text = this._scene.add.text(go.x, go.y, 'ПОГНАЛИ', {
        font: '35px Grato-Bold',
        color: '#FFFFFF'
      }).setOrigin(.5, .5);
      go.callback = this._play.bind(this);
    }
  }

  private _ratings(): void {
    Settings.setScreen(screen.RATINGS);
    this._scene.scene.restart();
  }

  private _play(): void {
    this._scene.scene.start('Game');
  }
}

export default Rules;