class Session {
  
  private _time: number;

  public clear(): void {
    this._time = 0;
  }

  public plusTime(num: number = 1): void {
    this._time += num;
  }

  public getTime(): number {
    return this._time;
  }
}

export default new Session();