import axios from 'axios';
import * as Webfont from 'webfontloader';
import loading from '../../assets/images/loading.png';
import Interval from '../actions/Interval';
import Sounds from '../actions/Sounds';
import Settings from '../data/Settings';
import User from '../data/User';
import PreloadConfig from '../data/PreloadConfig';
import { screen } from '../types/enums';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        viewportHeight: number;
        viewportStableHeight: number;
        ready: () => void;
        expand: () => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
          secondary_bg_color: string;
        },
        initDataUnsafe: {
          user: {
            id: string;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
          }
        }
      };
    }
  }
}

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  private _fonts: boolean = false;
  private _user: boolean = false;

  public init(): void {
    Webfont.load({
      custom: {
        families: ['Triomphe']
      },
      active: (): void => {
        this._fonts = true;
      }
    });
    Settings.sounds = new Sounds(this);
    Settings.interval = new Interval(this);
    this._checkUser();
  }

  public preload(): void {
    this.load.image('loading', loading);
  }

  public update(): void {
    if (!this._fonts) return;
    if (!this._user) return;
    this._fonts = false;
    this._user = false;
    Settings.setPreloadConfig(PreloadConfig.get());
    this.scene.launch('Loading');
  }

  private async _checkUser(): Promise<void> {
    const telegram = window.Telegram.WebApp;
    telegram.ready();
    telegram.expand();

    try { User.setID(telegram.initDataUnsafe.user.id); }
    catch (e) { User.setID('0'); }
    
    try { User.setUsername(telegram.initDataUnsafe.user.username); }
    catch (e) { User.setUsername('username'); }

    try { User.setFirstName(telegram.initDataUnsafe.user.first_name); }
    catch (e) { User.setFirstName('noname'); }
    
    try { User.setLastName(telegram.initDataUnsafe.user.last_name); }
    catch (e) { User.setLastName(''); }

    await axios.post(process.env.API + '/getData', {
      id: User.getID(),
      username: User.getUsername(),
      first_name: User.getFirstName(),
      last_name: User.getLastName()
    }).then(res => {
      if (!res.data.error) {

        if (res.data.data.old) {
          Settings.setScreen(screen.MAIN);
        }
      }
    }).catch(e => console.log(e));
    this._user = true;
  }
}

export default Boot;