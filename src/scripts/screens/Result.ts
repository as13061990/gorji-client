import axios from 'axios';
import Button from '../components/Button';
import Session from '../data/Session';
import Settings from '../data/Settings';
import Utils from '../data/Utils';
import UI from '../scenes/UI';
import { screen } from '../types/enums';
import User from '../data/User';

class Result {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY, height } = this._scene.cameras.main;

    this._scene.add.text(centerX, 100, 'Попробуй еще раз', {
      font: '48px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);

    const time = this._scene.add.text(centerX, centerY - 400, 'Твое время:', {
      font: '38px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);
    const score = this._scene.add.text(centerX, time.getBounds().bottom + 20, Utils.convertTime(Session.getTime()), {
      font: '80px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, 0);

    this._scene.add.text(centerX, score.getBounds().bottom + 200, 'Ой! Постарайся в следующий раз собрать больше бутылок GORJI и восполнить свой уровень здоровья на максимум.\n\nСыграем еще раз?', {
      font: '28px Triomphe',
      color: '#3B175C',
      align: 'center',
      wordWrap: { width: 700 }
    }).setOrigin(.5, 0);


    const again = new Button(this._scene, centerX, height - 300, 'button');
    again.text = this._scene.add.text(again.x, again.y, 'ИГРАТЬ ЕЩЕ', {
      font: '26px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    again.callback = this._again.bind(this);

    const back = new Button(this._scene, centerX, height - 200, 'button');
    back.text = this._scene.add.text(back.x, back.y, 'НАЗАД', {
      font: '26px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    back.callback = this._back.bind(this);

    this._sendResult();
  }

  private _again(): void {
    this._scene.scene.start('Game');
  }

  private _back(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.restart();
  }

  private _sendResult(): void {
    axios.post(process.env.API + '/sendResult', {
      id: User.getID(),
      score: Session.getTime(),
      session: Session.getID(),
      hash: User.getHash()
    }).then(res => console.log(res.data));
  }
}

export default Result;