class User {

  private _id: string;
  private _username: string;
  private _firstname: string;
  private _lastname: string;
  private _hash: string;

  public setID(id: string): void {
    this._id = id;
  }

  public getID(): string {
    return this._id;
  }

  public setUsername(username: string): void {
    this._username = username;
  }

  public getUsername(): string {
    return this._username;
  }

  public setFirstName(firstname: string): void {
    this._firstname = firstname;
  }

  public getFirstName(): string {
    return this._firstname;
  }

  public setLastName(lastname: string): void {
    this._lastname = lastname;
  }

  public getLastName(): string {
    return this._lastname;
  }

  public setHash(hash: string): void {
    this._hash = hash;
  }

  public getHash(): string {
    return this._hash;
  }
}

export default new User();