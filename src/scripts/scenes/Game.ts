import GameActions from '../actions/GameActions';
import HP from '../components/HP';
import Session from '../data/Session';
import User from '../data/User';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public actions: GameActions = new GameActions(this);
  public objects: Phaser.Physics.Arcade.Group;
  public hp: HP;

  public init(): void {
    Session.clear();
  }

  public create(): void {
    this.objects = this.physics.add.group();
    this.actions.init();
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

export default Game;