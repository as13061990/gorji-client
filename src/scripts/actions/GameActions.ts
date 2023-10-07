import Game from '../scenes/Game';

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;

  public init(): void {
    console.log('Game ACTIONS')
  }
}

export default GameActions;