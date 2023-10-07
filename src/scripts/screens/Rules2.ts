import Button from '../components/Button';
import Settings from '../data/Settings';
import UI from '../scenes/UI';
import { screen } from '../types/enums';

class Rules2 {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY, height } = this._scene.cameras.main;

    this._scene.add.text(centerX, 100, 'КАК ИГРАТЬ?', {
      font: '48px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);

    this._scene.add.text(centerX, centerY, '1. Бутылка GORJI и Кремний дают разное количество очков здоровья\n\n2. У тебя будет 100 очков здоровья, которое расходуется в процессе игры. Чтобы пополнять здоровье, не упускай из вида Бутылки GORJI и Кремний, будь внимателен, не собирай любые другие предметы!', {
      font: '30px Triomphe',
      color: '#3B175C',
      align: 'center',
      wordWrap: { width: 800 }
    }).setOrigin(.5, .5);

    const button = new Button(this._scene, centerX, height - 200, 'button');
    button.text = this._scene.add.text(button.x, button.y, 'ДАЛЕЕ', {
      font: '30px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    button.callback = this._next.bind(this);
  }

  private _next(): void {
    Settings.setScreen(screen.RULES_3);
    this._scene.scene.restart();
  }
}

export default Rules2;