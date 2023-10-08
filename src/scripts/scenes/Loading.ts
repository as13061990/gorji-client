import Settings from '../data/Settings';

class Loading extends Phaser.Scene {
  constructor() {
    super('Loading');
  }

  private _config: IpreloadConfig;

  public init(): void {
    this._config = Settings.getPreloadConfig();
  }

  public preload(): void {
    const { centerX, centerY } = this.cameras.main;
    const sprite = this.add.sprite(centerX, centerY, 'loading');
    this.add.tween({
      targets: sprite,
      rotation: Math.PI * 2,
      repeat: -1,
      duration: 2000
    });
    const bounds = sprite.getBounds();
    const text = this.add.text(centerX, bounds.bottom + 50, 'Загрузка...0%', {
      font: '70px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);
    const build = this.add.text(10, 10, 'build: ' + process.env.BUILD_TIME, {
      font: '25px Triomphe',
      color: '#3B175C'
    });

    this.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText('Загрузка...' + percent + '%');
    }, this);
    this.load.on('complete', (): void => {
      this.load.removeAllListeners();
      sprite.destroy();
      text.destroy();
      build.destroy();
      this.scene.start(this._config.scene);
    }, this);

    this._loading();
  }

  private _loading(): void {
    this._loadImages();
    this._loadSounds();
    this._createTextures();
  }

  private _loadImages(): void {
    for (const key in this._config.images) {
      this.load.image(key, this._config.images[key]);
    }
  }

  private _loadSounds(): void {
    for (const key in this._config.sounds) {
      this.load.image(key, this._config.sounds[key]);
    }
  }
  
  private _createTextures(): void {
    this._createRectangle(600, 70, 0xF8F1EB, 'hp-bg');
    this._createRectangle(600, 70, 0x6440BF, 'hp-progress');
    this._createRectangle(604, 74, 0x000000, 'hp-borders');
  }

  private _createRectangle(width: number, height: number, color: number, key: string): void {
    const texture = this.add.renderTexture(0, 0, width, height);
    const rectangle = this.add.rectangle(0, 0, width, height, color).setOrigin(0, 0);
    texture.draw(rectangle, 0, 0);
    rectangle.destroy();
    texture.saveTexture(key);
    texture.destroy();
  }

  private _createCircle(radius: number, color: number, key: string): void {
    const texture = this.add.renderTexture(0, 0, radius * 2, radius * 2);
    const rectangle = this.add.circle(0, 0, radius, color).setOrigin(0, 0);
    texture.draw(rectangle, 0, 0);
    rectangle.destroy();
    texture.saveTexture(key);
    texture.destroy();
  }
}

export default Loading;