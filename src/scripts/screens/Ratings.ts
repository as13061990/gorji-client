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
    const { centerX, centerY, height } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#020202');
    this._scene.add.sprite(centerX, 0, 'bg').setOrigin(.5, 0);
    
    const bg = this._scene.add.sprite(centerX, centerY - 120, 'bg-ratings').getBounds();

    this._scene.add.text(centerX, bg.top + 80, 'РЕЙТИНГ', {
      font: '45px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5).setStroke('#3592FF', 2);

    const button = new Button(this._scene, centerX, height - 140, 'button-orange');
    button.icon = this._scene.add.sprite(button.x, button.y, 'back-orange');
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
    const spacing = 71;
    const y = centerY - 360;
    const x = 100;

    this._rating.map((user, i) => {
      const color = user.self ? '#FF5B35' : '#FFFFFF';
      const player = this._scene.add.text(x, y + i * spacing, (user.place + '. ' + user.name).toUpperCase(), {
        font: '25px Grato-Medium',
        color: color
      });
      this._scene.add.text(width - x, y + i * spacing, Utils.convertTime(user.record), {
        font: '25px Grato-Medium',
        color: color
      }).setOrigin(1, 0);

      if (i < 5) {
        const bounds = player.getBounds();
        const text = i === 0 ? '🏆' : '⚡️';
        this._scene.add.text(bounds.right + 30, bounds.centerY, text, {
          font: '25px Grato-Medium',
          color: color
        }).setOrigin(.5, .5);
      }

      if (i < this._rating.length - 1) {
        this._scene.add.rectangle(x, y + i * spacing + 50, width - x * 2, 2, 0x434343).setOrigin(0, .5);
      }
    });
  }

  private _back(): void {
    const screen = Settings.getLastScreen();
    Settings.setScreen(screen);
    this._scene.scene.restart();
  }
}

export default Ratings;