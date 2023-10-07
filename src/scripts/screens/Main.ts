import Button from '../components/Button';
import Settings from '../data/Settings';
import UI from '../scenes/UI';
import { screen } from '../types/enums';

class Main {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY, height } = this._scene.cameras.main;

    this._scene.add.text(centerX, 100, 'Пополняй ХП с Gorji', {
      font: '48px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);

    this._scene.add.text(centerX, centerY, 'Продержись, как можно дольше в игре и стань лучшим, чтобы получить призы!', {
      font: '40px Triomphe',
      color: '#3B175C',
      align: 'center',
      wordWrap: { width: 800 }
    }).setOrigin(.5, .5);
    
    const play = new Button(this._scene, centerX, height - 400, 'button');
    play.text = this._scene.add.text(play.x, play.y, 'Играть', {
      font: '26px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    play.callback = this._play.bind(this);

    const ratings = new Button(this._scene, centerX, height - 300, 'button');
    ratings.text = this._scene.add.text(ratings.x, ratings.y, 'ТАБЛИЦА ЛИДЕРОВ', {
      font: '26px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    ratings.callback = this._ratings.bind(this);

    const rules = new Button(this._scene, centerX, height - 200, 'button');
    rules.text = this._scene.add.text(rules.x, rules.y, 'ПРАВИЛА', {
      font: '26px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    rules.callback = this._rules.bind(this);
  }

  private _play(): void {
    this._scene.scene.start('Game');
  }

  private _ratings(): void {
    Settings.setScreen(screen.RATINGS);
    this._scene.scene.restart();
  }

  private _rules(): void {
    Settings.setScreen(screen.RULES_1);
    this._scene.scene.restart();
  }
}

export default Main;