import axios from 'axios';
import Game from '../scenes/Game';
import Button from '../components/Button';
import Session from '../data/Session';
import Settings from '../data/Settings';
import Utils from '../data/Utils';
import User from '../data/User';
import { screen } from '../types/enums';

class Result {
  constructor(scene: Game) {
    this._scene = scene;
    this._build();
  }

  private _scene: Game;

  private _build(): void {
    const depth = 5;
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    this._scene.add.tileSprite(centerX, centerY, width, height, 'black-pixel').setDepth(5).setAlpha(.8);

    const time = this._scene.add.text(centerX, 80, 'Твое время:', {
      font: '40px Grato-Bold',
      color: '#FF5B35'
    }).setOrigin(.5, .5).setDepth(depth);
    this._scene.add.text(centerX, time.getBounds().bottom + 20, Utils.convertTime(Session.getTime()), {
      font: '100px Grato-Bold',
      color: '#FF5B35'
    }).setOrigin(.5, 0).setDepth(depth);

    const play = new Button(this._scene, centerX, height - 317, 'button-orange').setDepth(depth);
    play.text = this._scene.add.text(play.x, play.y, 'УЛУЧШИТЬ', {
      font: '35px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setDepth(depth);
    play.callback = this._again.bind(this);

    const back = new Button(this._scene, centerX + 260, height - 140, 'button-grey').setDepth(depth);
    back.icon = this._scene.add.sprite(back.x, back.y, 'back-grey').setDepth(depth);
    back.callback = this._back.bind(this);

    const rules = new Button(this._scene, centerX - 260, height - 140, 'button-grey').setDepth(depth);
    rules.text = this._scene.add.text(rules.x, rules.y, 'СОХРАНИТЬ', {
      font: '35px Grato-Bold',
      color: '#DAF7FD'
    }).setOrigin(.5, .5).setShadow(5, 5, '#000000').setDepth(depth);
    rules.callback = this._ratings.bind(this);

    this._sendResult();
  }

  private _again(): void {
    this._scene.scene.restart();
  }

  private _back(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.start('UI');
  }

  private _ratings(): void {
    Settings.setScreen(screen.RATINGS);
    this._scene.scene.start('UI');
  }

  private _sendResult(): void {
    axios.post(process.env.API + '/sendResult', {
      id: User.getID(),
      score: Session.getTime(),
      session: Session.getID(),
      hash: User.getHash()
    });
  }
}

export default Result;