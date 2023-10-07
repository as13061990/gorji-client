import Button from '../components/Button';
import Settings from '../data/Settings';
import UI from '../scenes/UI';
import { screen } from '../types/enums';

class Rules1 {
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
    
    this._scene.add.text(centerX, centerY, '1. Зажми, а затем удерживай перчатку\n\n2. Собирай предметы, чтобы пополнять здоровье\n\n3. В игре будут попадаться полезные предметы: Бутылки GORJI и Кремний, они пополняют твое здоровье, и предметы, которые уменьшают здоровье: Мина и Бутылка с ядом', {
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
    Settings.setScreen(screen.RULES_2);
    this._scene.scene.restart();
  }
}

export default Rules1;