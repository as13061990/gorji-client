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
    this.add.text(10, 10, 'build: ' + process.env.BUILD_TIME, {
      font: '25px Grato-Bold',
      color: '#FFFFFF'
    });
    const { centerX, centerY, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#020202');
    this.add.sprite(centerX, 0, 'bg-loading').setOrigin(.5, 0);
    this.add.sprite(centerX, centerY, 'logo-bottle');
    this.add.sprite(centerX, 73, 'logo').setOrigin(.5, 0);
    
    const bgProgress = this.add.sprite(centerX, height - 108, 'loading-progress-bar-bg').setOrigin(.5, 1);
    const bounds = bgProgress.getBounds();
    const progress = this.add.sprite(bounds.left + 15, bounds.centerY, 'loading-progress-bar').setOrigin(0, .5);
    progress.setDisplaySize(1, progress.displayHeight);
    
    const text = this.add.text(centerX, bounds.centerY, '0%', {
      font: '30px Grato-Bold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);

    this.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      const unit = progress.width / 100;
      progress.setDisplaySize(Math.floor(percent * unit), progress.displayHeight);
      text.setText(percent + '%');
    }, this);
    this.load.on('complete', (): void => {
      this.load.removeAllListeners();
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