import axios from 'axios';
import UI from '../scenes/UI';
import User from '../data/User';
import Settings from '../data/Settings';
import { screen } from '../types/enums';
import Button from '../components/Button';
import Utils from '../data/Utils';

class Ratings {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;
  private _rating: Irating[] = [];

  private _build(): void {
    const { centerX, height } = this._scene.cameras.main;

    this._scene.add.text(centerX, 100, 'ЛУЧШИЕ', {
      font: '48px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);

    const button = new Button(this._scene, centerX, height - 100, 'button');
    button.text = this._scene.add.text(button.x, button.y, 'НАЗАД', {
      font: '30px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);
    button.callback = this._back.bind(this);

    this._getRating();
  }

  private _getRating(): void {
    axios.post(process.env.API + '/getRating', {
      id: User.getID()
    }).then((res): void => {
      if (!res.data.error) {
        this._rating = res.data.data;
        this._showRating();
      }
    });
  }

  private _showRating(): void {
    if (Settings.getScreen() !== screen.RATINGS) return;
    const { width, centerY } = this._scene.cameras.main;
    const spacing = 80;
    const y = centerY - 450;

    this._rating.map((user, i) => {
      const color = user.self ? '#000000' : '#3B175C';
      this._scene.add.text(100, y + i * spacing, (user.place + '. ' + user.name).toUpperCase(), {
        font: '30px Triomphe',
        color: color
      });
      this._scene.add.text(width - 100, y + i * spacing, Utils.convertTime(user.record), {
        font: '30px Triomphe',
        color: color
      }).setOrigin(1, 0);
    });
  }

  private _back(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.restart();
  }
}

export default Ratings;