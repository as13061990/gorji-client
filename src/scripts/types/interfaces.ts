interface Iposition {
  x: number;
  y: number;
}
interface IpreloadConfig {
  scene: string;
  images: { [key: string]: string };
  sounds: { [key: string]: string };
}
interface Isounds {
  resumeMusic: () => void;
  pauseMusic: () => void;
  playMusic: (sound: string) => void;
  stopMusic: () => void;
  play: (sound: string) => void;
  mute: () => void;
  unmute: () => void;
  getVolume: () => number;
}
interface Isizes {
  width: number;
  height: number;
}
interface Irating {
  place: number;
  record: number;
  name: string;
  self: boolean;
}
interface IObjectParams {
  sideMove: number;
  gravity: number;
  strongSideMove: number;
  kick: number;
  launch: number;
  launchSide: number;
}