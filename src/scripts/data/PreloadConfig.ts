import bg from '../../assets/images/bg.jpg';
import blackPixel from '../../assets/images/black-pixel.png';
import buttonOrange from '../../assets/images/button-orange.png';
import buttonGrey from '../../assets/images/button-grey.png';
import glove1 from '../../assets/images/glove-1.png';
import glove2 from '../../assets/images/glove-2.png';
import glove3 from '../../assets/images/glove-3.png';
import object1 from '../../assets/images/object-1.png';
import object2 from '../../assets/images/object-2.png';
import object3 from '../../assets/images/object-3.png';
import object4 from '../../assets/images/object-4.png';
import bgRules from '../../assets/images/bg-rules.png';
import rulesIcon1 from '../../assets/images/rules-icon-1.png';
import rulesIcon2 from '../../assets/images/rules-icon-2.png';
import rulesIcon3 from '../../assets/images/rules-icon-3.png';
import rulesIcon4 from '../../assets/images/rules-icon-4.png';
import bgHp from '../../assets/images/bg-hp.png';
import hpProgress from '../../assets/images/hp-progress.png';
import backOrange from '../../assets/images/back-orange.png';
import backGrey from '../../assets/images/back-grey.png';
import bgRatings from '../../assets/images/bg-ratings.png';
import cloud from '../../assets/images/cloud.png';
import particle1 from '../../assets/images/particle-1.png';
import particle2 from '../../assets/images/particle-2.png';
import particle3 from '../../assets/images/particle-3.png';
import particle4 from '../../assets/images/particle-4.png';
import particle5 from '../../assets/images/particle-5.png';
import particle6 from '../../assets/images/particle-6.png';

class PreloadConfig {
  private _data: IpreloadConfig = {
    "scene": "UI",
    "images": {
      "bg": bg,
      "black-pixel": blackPixel,
      "glove-1": glove1,
      "glove-2": glove2,
      "glove-3": glove3,
      "object-1": object1,
      "object-2": object2,
      "object-3": object3,
      "object-4": object4,
      "button-orange": buttonOrange,
      "button-grey": buttonGrey,
      "bg-rules": bgRules,
      "rules-icon-1": rulesIcon1,
      "rules-icon-2": rulesIcon2,
      "rules-icon-3": rulesIcon3,
      "rules-icon-4": rulesIcon4,
      "bg-hp": bgHp,
      "hp-progress": hpProgress,
      "back-orange": backOrange,
      "back-grey": backGrey,
      "bg-ratings": bgRatings,
      "cloud": cloud,
      "particle-1": particle1,
      "particle-2": particle2,
      "particle-3": particle3,
      "particle-4": particle4,
      "particle-5": particle5,
      "particle-6": particle6
    },
    "sounds": {
      
    }
  }

  public get(): IpreloadConfig {
    return this._data;
  }

  public set(config: IpreloadConfig): void {
    this._data = config;
  }
}
export default new PreloadConfig;