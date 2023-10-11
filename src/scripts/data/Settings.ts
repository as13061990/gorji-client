import Interval from '../actions/Interval';
import { screen } from '../types/enums';

class Settings {

  public readonly sizes = {
    width: 1080,
    minHeight: 1367,
    maxHeight: 2500
  }
  private _screen: screen = screen.RULES;
  private _mobile: boolean = false;
  public sounds: Isounds;
  public interval: Interval;
  private _preloadConfig: IpreloadConfig;
  private _histiry: screen[] = [];

  public setScreen(screen: screen): screen {
    this._histiry.push(this._screen);
    this._screen = screen;
    return this._screen;
  }

  public getScreen(): screen {
    return this._screen;
  }

  public isMobile(): boolean {
    return this._mobile;
  }

  public setMobile(mobile: boolean): void {
    this._mobile = mobile;
  }

  public setPreloadConfig(config: IpreloadConfig): void {
    this._preloadConfig = config;
  }

  public getPreloadConfig(): IpreloadConfig {
    return this._preloadConfig;
  }

  public getLastScreen(): screen {
    return this._histiry[this._histiry.length - 1];
  }
}

export default new Settings();