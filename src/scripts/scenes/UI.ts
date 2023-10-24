import Settings from '../data/Settings';
import Ban from '../screens/Ban';
import Main from '../screens/Main';
import Ratings from '../screens/Ratings';
import Rules from '../screens/Rules';
import { screen } from '../types/enums';

class UI extends Phaser.Scene {
  constructor() {
    super('UI');
  }

  public create(): void {
    if (Settings.getScreen() === screen.MAIN) {
      new Main(this);
    } else if (Settings.getScreen() === screen.RULES) {
      new Rules(this);
    } else if (Settings.getScreen() === screen.RATINGS) {
      new Ratings(this);
    } else if (Settings.getScreen() === screen.BAN) {
      new Ban(this);
    }
  }

  public setGradient(text: Phaser.GameObjects.Text): void {
    const gradient = text.context.createLinearGradient(0, 0, text.width, text.height);
    gradient.addColorStop(0, '#9A6AEA');
    gradient.addColorStop(.2, '#75EEFE');
    gradient.addColorStop(.5, '#F7BA80');
    gradient.addColorStop(1, '#AF1572');
    text.setFill(gradient);
  }

  public move(object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text, target: Iposition = null): void {
    const { centerX, centerY } = this.cameras.main;
    const x = target ? target.x : centerX;
    const y = target ? target.y : centerY;
    const log = (object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text): void => {
      console.clear();
      console.log({
        x: x - object.x,
        y: y - object.y
      });
    }

    const cursors = this.input.keyboard.createCursorKeys();
    cursors.left.on('down', (): void => {
      object.x -= 1;
      log(object);
    });
    cursors.right.on('down', (): void => {
      object.x += 1;
      log(object);
    });
    cursors.up.on('down', (): void => {
      object.y -= 1;
      log(object);
    });
    cursors.down.on('down', (): void => {
      object.y += 1;
      log(object);
    });

    object.setInteractive();
    this.input.setDraggable(object);
    this.input.on('drag', (pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text, dragX: number, dragY: number): void => {
      object.x = Math.round(dragX);
      object.y =  Math.round(dragY);
    });
    this.input.on('dragend', (pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text): void => {
      log(object);
    });
  }
}

export default UI;