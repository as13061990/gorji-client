class Session {
  
  private _time: number;
  private _hp: number;
  private _ready: boolean;
  private _over: boolean;

  public clear(): void {
    this._time = 0;
    this._hp = 100;
    this._ready = false;
    this._over = false;
  }

  public plusTime(num: number = 1): void {
    this._time += num;
  }

  public getTime(): number {
    return this._time;
  }

  public setReady(ready: boolean): void {
    this._ready = ready;
  }

  public isReady(): boolean {
    return this._ready;
  }

  public plusHP(hp: number): void {
    this._hp = this._hp + hp > 100 ? 100 : this._hp + hp;
  }

  public minusHP(hp: number): void {
    this._hp = this._hp < hp ? 0 : this._hp - hp;
  }

  public getHP(): number {
    return this._hp;
  }

  public isOver(): boolean {
    return this._over;
  }

  public setOver(over: boolean): void {
    this._over = over;
  }

  public getCo(): number {
    const add = Math.floor(this._time / 1000) / 10;
    return 1 + add;
  }
}

export default new Session();