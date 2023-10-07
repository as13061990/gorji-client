import button from '../../assets/images/button.png';
import glove from '../../assets/images/glove.png';
import object1 from '../../assets/images/object-1.png';
import object2 from '../../assets/images/object-2.png';
import object3 from '../../assets/images/object-3.png';
import object4 from '../../assets/images/object-4.png';
import object5 from '../../assets/images/object-5.png';
import object6 from '../../assets/images/object-6.png';

class PreloadConfig {
  private _data: IpreloadConfig = {
    "scene": "UI",
    "images": {
      "button": button,
      "glove": glove,
      "object-1": object1,
      "object-2": object2,
      "object-3": object3,
      "object-4": object4,
      "object-5": object5,
      "object-6": object6
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